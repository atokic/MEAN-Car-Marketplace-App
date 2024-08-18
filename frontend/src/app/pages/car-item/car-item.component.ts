import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CarsService } from '../../services/cars.service';
import { Car } from '../../services/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { CarEditDialogComponent } from '../../components/car-edit-dialog/car-edit-dialog.component';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.css']
})
export class CarItemComponent implements OnInit {
  car?: Car;

  constructor(
    private route: ActivatedRoute,
    private carsService: CarsService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const carId = params['id'];
      this.fetchCarDetails(carId);
    });
  }

  fetchCarDetails(carId: string): void {
    this.carsService.getCarById(carId).subscribe(
      (data: Car) => {
        this.car = data;
      },
      (error) => {
        console.error('Error fetching car details:', error);
      }
    );
  }

  editCar(): void {
    if (!this.car || !this.car.carID) {
      console.error('Car details are missing or carID is not available.');
      return;
    }
  
    const dialogRef = this.dialog.open(CarEditDialogComponent, {
      data: { car: { ...this.car } },
      width: '500px',
      panelClass: 'custom-dialog-container'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result && typeof result === 'object') {
        if (this.car && this.car.carID) {
        this.carsService.updateCar(this.car.carID, result).subscribe(
          updatedCar => {
              this.car = updatedCar;
              this.snackBar.open('Car updated successfully!', 'Close', { duration: 3000 });
            },
            error => {
              this.snackBar.open('Error updating car', 'Close', { duration: 3000 });
            }
         );
        
      } else {
        console.log('No update made to the car.');
      }
    }});
  }

  deleteCar(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container',
      data: { message: 'Are you sure you want to delete this car?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.car && this.car.carID) {
          this.carsService.deleteCar(this.car.carID).subscribe(
            () => {
              this.snackBar.open('Car deleted successfully!', 'Close', { duration: 3000 });
              this.router.navigate(['/my-ads']);
            },
            (error) => {
              this.snackBar.open('Error deleting car', 'Close', { duration: 3000 });
            }
          );
        }
      }
      else {
        console.log('Car not deleted');
      }
    });
  }
}