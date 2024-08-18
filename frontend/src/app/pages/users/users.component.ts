import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { User } from '../../services/models';
import { MatDialog } from '@angular/material/dialog';
import { UserEditDialogComponent } from '../../components/user-edit-dialog/user-edit-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[] = [];

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.usersService.getAllUsers().subscribe(
      (data: User[]) => {
        this.users = data;
      },
      error => {
        this.snackBar.open('Error fetching user', 'Close', { duration: 3000 });
      }
    );
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      data: { user },
      width: '500px',
      panelClass: 'bg-color'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.fetchUsers();
        this.snackBar.open('User changes have been saved.', 'Close', { duration: 3000 });
      } else {
        this.snackBar.open('User changes were not saved.', 'Close', { duration: 3000 });
      }
    });
  }

  deleteUser(userID: string): void {
    if (userID) {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: '300px',
        panelClass: 'confirm-dialog-container',
        data: { message: 'Are you sure you want to delete this user?' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.usersService.deleteUser(userID).subscribe(
            () => {
              this.users = this.users.filter(user => user.userID !== userID);
              this.snackBar.open('User deleted successfully!', 'Close', { duration: 3000 });
            },
            error => {
              this.snackBar.open('Error deleting user', 'Close', { duration: 3000 });
            }
          );
        }
      });
    } else {
      this.snackBar.open('Invalid user ID', 'Close', { duration: 3000 });
    }
  }
}
