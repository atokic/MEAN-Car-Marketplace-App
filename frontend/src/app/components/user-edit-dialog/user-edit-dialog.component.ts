import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../services/models';
import { UsersService } from '../../services/users.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.css']
})
export class UserEditDialogComponent {
  originalUser: User;

  constructor(
    public dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private usersService: UsersService,
    private snackBar: MatSnackBar
  ) {
    this.originalUser = { ...data.user };
  }

  onSave(): void {
    this.usersService.updateUser(this.data.user.userID, this.data.user).subscribe(
      () => {
        this.snackBar.open('User updated successfully!', 'Close', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error => {
        console.error('Error updating user', error);
      }
    );
  }

  onCancel(): void {
    this.data.user = { ...this.originalUser };
    this.dialogRef.close(false);
  }
}
