import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../services/models';
import { UsersService } from '../../services/users.service';
import { CountryService } from '../../services/country.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-profile-dialog',
  templateUrl: './my-profile-dialog.component.html',
  styleUrls: ['./my-profile-dialog.component.css']
})
export class MyProfileDialogComponent implements OnInit {
  originalUser: User;
  countries: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<MyProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User },
    private usersService: UsersService,
    private countryService: CountryService,
    private snackBar: MatSnackBar
  ) {
    this.originalUser = { ...data.user };
  }

  ngOnInit(): void {
    this.countries = this.countryService.getAllCountries();
  }

  onSave(): void {
    this.usersService.updateUserProfile(this.data.user).subscribe(
      () => {
        this.snackBar.open('Profile updated successfully!', 'Close', { duration: 3000 });
        this.dialogRef.close(this.data.user);
      },
      error => {
        console.error('Error updating profile', error);
      }
    );
  }

  onCancel(): void {
    this.data.user = { ...this.originalUser };
    this.dialogRef.close(false);
  }
}
