import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../../services/models';
import { MyProfileDialogComponent } from '../../components/my-profile-dialog/my-profile-dialog.component';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  userProfile: User | null = null;

  constructor(
    private usersService: UsersService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.usersService.getUserProfile().subscribe(
      (profile: User) => {
        this.userProfile = profile;
      },
      error => {
        console.error('Error fetching user profile', error);
      }
    );
  }

  editProfile(): void {
    if (!this.userProfile) return;

    const dialogRef = this.dialog.open(MyProfileDialogComponent, {
      data: { user: { ...this.userProfile } },
      width: '500px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && typeof result === 'object') {
        this.usersService.updateUserProfile(result).subscribe(
          updatedProfile => {
            this.userProfile = updatedProfile;
            this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 });
          },
          error => {
            console.error('Error updating profile', error);
          }
        );
      } else {
        console.log('No update made to the profile.');
      }
    });
  }
}
