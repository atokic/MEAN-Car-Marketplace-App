import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CarsService } from '../../services/cars.service';
import { CarDataService } from '../../services/car-data.service';
import { Car } from '../../services/models';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.css']
})
export class AddCarComponent implements OnInit {
  carForm!: FormGroup;
  brands: string[] = [];
  models: string[] = [];
  years: number[] = [];
  fuelTypes: string[] = [];

  constructor(
    private fb: FormBuilder,
    private carsService: CarsService,
    private carDataService: CarDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.brands = this.carDataService.getBrands();
    this.years = this.carDataService.getYears();
    this.fuelTypes = this.carDataService.getFuelTypes();

    this.carForm = this.fb.group({
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]],
      price: ['', [Validators.required, Validators.min(0)]],
      kilometers: ['', [Validators.required, Validators.min(0)]],
      fuel: ['', Validators.required],
      consumption: ['', [Validators.required, Validators.min(0)]],
      description: [''],
      image: ['']
    });

    this.carForm.get('brand')?.valueChanges.subscribe((selectedBrand) => {
      this.models = this.carDataService.getModels(selectedBrand);
      this.carForm.get('model')?.reset();
    });
  }

  onSubmit(): void {
    if (this.carForm.valid) {
      const formValue = this.carForm.value;
      const carData: Omit<Car, 'carID' | 'user' | 'createdAt'> = {
        ...formValue,
        price: this.parsePrice(formValue.price),
        kilometers: this.parseKilometers(formValue.kilometers),
        consumption: this.parseConsumption(formValue.consumption)
      };
      this.carsService.createCar(carData).subscribe(
        (response: Car) => {
          console.log('Car added successfully:', response);
          this.router.navigate(['/my-ads']);
        },
        (error) => {
          console.error('Error adding car:', error);
        }
      );
    }
  }

  parsePrice(value: string): number {
    return parseFloat(value.replace(/[^\d.-]/g, ''));
  }

  parseKilometers(value: string): number {
    return parseInt(value.replace(/[^\d]/g, ''), 10);
  }

  parseConsumption(value: string): number {
    return parseFloat(value.replace(/[^0-9.]/g, ''));
  }

  onFocus(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    const rawValue = this.carForm.get(field)?.value;
    input.value = rawValue;
  }

  onBlur(event: Event, field: string): void {
    const input = event.target as HTMLInputElement;
    let formattedValue: string;
    switch (field) {
      case 'price':
        formattedValue = this.formatPrice(this.parsePrice(input.value));
        break;
      case 'kilometers':
        formattedValue = this.formatKilometers(this.parseKilometers(input.value));
        break;
      case 'consumption':
        formattedValue = this.formatConsumption(this.parseConsumption(input.value));
        break;
      default:
        formattedValue = input.value;
        break;
    }
    this.carForm.get(field)?.setValue(formattedValue, { emitEvent: false });
    input.value = formattedValue;
  }

  formatPrice(value: number): string {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'EUR' }).replace('€', '').trim();
  }

  formatKilometers(value: number): string {
    return value.toLocaleString('en-US');
  }

  formatConsumption(value: number): string {
    return value.toFixed(2);
  }
}
