import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Car } from '../../services/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-car-edit-dialog',
  templateUrl: './car-edit-dialog.component.html',
  styleUrl: './car-edit-dialog.component.css'
})
export class CarEditDialogComponent {
  car: Car;

  constructor(
    public dialogRef: MatDialogRef<CarEditDialogComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { car: Car }
  ) {
    this.car = { ...data.car };
  }

  onSave(): void {
    this.snackBar.open('Car updated successfully!', 'Close', { duration: 3000 });
    this.dialogRef.close(this.car);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
