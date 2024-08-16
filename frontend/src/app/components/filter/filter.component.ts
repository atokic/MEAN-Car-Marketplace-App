import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarDataService } from '../../services/car-data.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Output() filterChanged = new EventEmitter<any>();

  filterForm: FormGroup;
  brands: string[] = [];
  models: string[] = [];
  fuelTypes: string[] = [];
  years: number[] = [];
  priceOptions: number[] = [];
  kilometersOptions: number[] = [];
  minConsumptionOptions: number[] = [];
  maxConsumptionOptions: number[] = [];

  constructor(private fb: FormBuilder, private carDataService: CarDataService) {
    this.filterForm = this.fb.group({
      brand: [''],
      model: [{ value: '', disabled: true }],
      fuelType: [''],
      minYear: [''],
      maxYear: [''],
      minPrice: [''],
      maxPrice: [''],
      minKilometers: [''],
      maxKilometers: [''],
      minConsumption: [''],
      maxConsumption: ['']
    }, { validators: this.customValidator() });
  }

  ngOnInit(): void {
    this.brands = this.carDataService.getBrands();
    this.fuelTypes = this.carDataService.getFuelTypes();
    this.years = this.carDataService.getYears();
    this.priceOptions = [500, 1000, 2000, 3000, 4000, 5000, 10000, 15000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000];
    this.kilometersOptions = [500, 1000, 2000, 3000, 4000, 5000, 10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 150000, 200000, 300000, 400000, 500000, 600000, 700000, 800000, 900000, 1000000];
    this.minConsumptionOptions = this.generateConsumptionOptions();
    this.maxConsumptionOptions = this.generateConsumptionOptions();

    this.filterForm.get('brand')?.valueChanges.subscribe(brand => {
      if (brand) {
        this.models = this.carDataService.getModels(brand);
        this.filterForm.get('model')?.enable();
        this.filterForm.get('model')?.setValue('');
      } else {
        this.models = [];
        this.filterForm.get('model')?.disable();
        this.filterForm.get('model')?.setValue('');
      }
    });
  }

  private generateConsumptionOptions(): number[] {
    return Array.from({ length: 151 }, (_, i) => (2 + i * 0.5).toFixed(1)).map(Number);
  }

  private customValidator() {
    return (group: FormGroup) => {
      const minPrice = group.get('minPrice')?.value;
      const maxPrice = group.get('maxPrice')?.value;
      const minYear = group.get('minYear')?.value;
      const maxYear = group.get('maxYear')?.value;
      const minKilometers = group.get('minKilometers')?.value;
      const maxKilometers = group.get('maxKilometers')?.value;
      const minConsumption = group.get('minConsumption')?.value;
      const maxConsumption = group.get('maxConsumption')?.value;

      return (minPrice && maxPrice && minPrice > maxPrice) ||
             (minYear && maxYear && minYear > maxYear) ||
             (minKilometers && maxKilometers && minKilometers > maxKilometers) ||
             (minConsumption && maxConsumption && minConsumption > maxConsumption)
        ? { invalidRange: true }
        : null;
    };
  }

  onApplyFilters(): void {
    const filters = this.filterForm.value;
    if (this.filterForm.valid) {
      this.filterChanged.emit(filters);
    }
  }
}
