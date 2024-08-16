import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars.service';
import { Car } from '../../services/models';

@Component({
  selector: 'app-car-ads',
  templateUrl: './car-ads.component.html',
  styleUrls: ['./car-ads.component.css'],
})
export class CarAdsComponent implements OnInit {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  searchTerm: string = ''; 
  isLoading = false;

  constructor(private carsService: CarsService) {}

  ngOnInit(): void {
    this.fetchCars();
  }

  fetchCars(): void {
    this.isLoading = true;
    this.carsService.getAllCars().subscribe(
      (data) => {
        this.cars = data;
        this.filteredCars = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching cars:', error);
        this.isLoading = false;
      }
    );
  }

  trackCar(index: number, car: Car) {
    return car.carID;
  }

  onSearch(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filterCars();
  }

  onFilter(filterValues: any): void {
    this.filteredCars = this.cars.filter(car => {
      return (!filterValues.brand || car.brand === filterValues.brand) &&
             (!filterValues.model || car.model === filterValues.model) &&
             (!filterValues.fuelType || car.fuel === filterValues.fuelType) &&
             (!filterValues.minYear || car.year >= filterValues.minYear) &&
             (!filterValues.maxYear || car.year <= filterValues.maxYear) &&
             (!filterValues.minPrice || car.price >= filterValues.minPrice) &&
             (!filterValues.maxPrice || car.price <= filterValues.maxPrice) &&
             (!filterValues.minKilometers || car.kilometers >= filterValues.minKilometers) &&
             (!filterValues.maxKilometers || car.kilometers <= filterValues.maxKilometers) &&
             (!filterValues.minConsumption || car.consumption >= filterValues.minConsumption) &&
             (!filterValues.maxConsumption || car.consumption <= filterValues.maxConsumption);
    });

    this.searchTerm = '';
  }

  private filterCars(): void {
    this.filteredCars = this.cars.filter(car => 
      (this.searchTerm === '' ||
      car.brand.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      car.model.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      car.year.toString().includes(this.searchTerm) ||
      car.fuel.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  formatPrice(price: number): string {
    return this.carsService.formatPrice(price);
  }

  formatKilometers(kilometers: number): string {
    return this.carsService.formatKilometers(kilometers);
  }

  formatConsumption(consumption: number): string {
    return this.carsService.formatConsumption(consumption);
  }
}
