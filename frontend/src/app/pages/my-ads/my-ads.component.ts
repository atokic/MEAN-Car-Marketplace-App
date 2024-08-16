import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CarsService } from '../../services/cars.service';
import { Car } from '../../services/models';

@Component({
  selector: 'app-my-ads',
  templateUrl: './my-ads.component.html',
  styleUrls: ['./my-ads.component.css'],
})
export class MyAdsComponent implements OnInit {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  searchTerm: string = '';
  isLoading = false;

  constructor(
    private carsService: CarsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      if (isAuthenticated) {
        this.fetchMyCars();
      } else {
        console.error('User is not authenticated');
      }
    });
  }

  fetchMyCars(): void {
    this.isLoading = true;
    this.carsService.getCarsByUser().subscribe(
      (data: Car[]) => {
        this.cars = data;
        this.filteredCars = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching my cars:', error);
        this.isLoading = false;
      }
    );
  }

  filterCars(): void {
    if (this.searchTerm.trim()) {
      this.filteredCars = this.cars.filter(car => 
        car.brand.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        car.year.toString().includes(this.searchTerm) ||
        car.fuel.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredCars = this.cars;
    }
  }

  trackCar(index: number, car: Car): string | undefined {
    return car.carID || '';
  }

  openAddCarDialog(): void {
    this.router.navigate(['/add-car']);
  }

  viewCarDetails(car: Car): void {
    this.router.navigate(['/car', car.carID]);
  }

  formatPrice(price: number): string {
    return this.carsService.formatPrice(price);
  }

  formatKilometers(kilometers: number): string {
    return this.carsService.formatKilometers(kilometers) + ' km';
  }

  formatConsumption(consumption: number): string {
    return this.carsService.formatConsumption(consumption) + ' l/100km';
  }
}
