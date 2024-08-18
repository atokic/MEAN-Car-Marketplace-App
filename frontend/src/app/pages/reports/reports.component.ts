import { Component, OnInit } from '@angular/core';
import { CarsService } from '../../services/cars.service';
import { Car } from '../../services/models';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Chart, registerables } from 'chart.js';
import { MatCardModule } from '@angular/material/card';

interface CarData {
  label: string;
  value: number;
}

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  totalCars: number = 0;
  carData: {
    byBrand: CarData[],
    byKilometers: CarData[],
    byYear: CarData[],
    byFuel: CarData[],
    byPriceRange: CarData[],
    monthlyAdded: CarData[],
    byConsumption: CarData[]
  } = {
    byBrand: [],
    byKilometers: [],
    byYear: [],
    byFuel: [],
    byPriceRange: [],
    monthlyAdded: [],
    byConsumption: []
  };

  constructor(private carsService: CarsService) {}

  ngOnInit(): void {
    this.loadCarData();
  }

  loadCarData(): void {
    this.carsService.getAllCars().subscribe(data => {
      this.totalCars = data.length;

      this.carData.byBrand = this.calculateByBrand(data);
      this.carData.byKilometers = this.calculateByKilometers(data);
      this.carData.byYear = this.calculateByYear(data);
      this.carData.byFuel = this.calculateByFuel(data);
      this.carData.byPriceRange = this.calculateByPriceRange(data);
      this.carData.monthlyAdded = this.calculateMonthlyAdded(data);
      this.carData.byConsumption = this.calculateByConsumption(data);

      this.renderCharts();
    });
  }

  calculateByBrand(cars: any[]): CarData[] {
    const brandCounts = cars.reduce((acc, car) => {
      acc[car.brand] = (acc[car.brand] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return Object.keys(brandCounts).map(brand => ({
      label: brand,
      value: brandCounts[brand]
    }));
  }

  calculateByYear(cars: any[]): CarData[] {
    const yearCounts = cars.reduce((acc, car) => {
      const year = car.year.toString();
      acc[year] = (acc[year] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  
    return Object.keys(yearCounts).map(year => ({
      label: year,
      value: yearCounts[year]
    }));
  }

  calculateByFuel(cars: any[]): CarData[] {
    const fuelTypeCounts = cars.reduce((acc, car) => {
      acc[car.fuel] = (acc[car.fuel] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  
    return Object.keys(fuelTypeCounts).map(fuelType => ({
      label: fuelType,
      value: fuelTypeCounts[fuelType]
    }));
  }

  calculateByPriceRange(cars: any[]): CarData[] {
    const priceRanges = ['0-10k', '10k-20k', '20k-30k', '30k-40k', '40k+'];
    const rangeCounts = priceRanges.reduce((acc, range) => {
      acc[range] = 0;
      return acc;
    }, {} as { [key: string]: number });

    cars.forEach(car => {
      const price = car.price;
      if (price < 10000) rangeCounts['0-10k']++;
      else if (price < 20000) rangeCounts['10k-20k']++;
      else if (price < 30000) rangeCounts['20k-30k']++;
      else if (price < 40000) rangeCounts['30k-40k']++;
      else rangeCounts['40k+']++;
    });

    return priceRanges.map(range => ({
      label: range,
      value: rangeCounts[range]
    }));
  }

  calculateByKilometers(cars: any[]): CarData[] {
    const kilometerRanges = ['0-50k', '50k-100k', '100k-150k', '150k-200k', '200k+'];
    const rangeCounts = kilometerRanges.reduce((acc, range) => {
      acc[range] = 0;
      return acc;
    }, {} as { [key: string]: number });
  
    cars.forEach(car => {
      const kilometers = car.kilometers;
      if (kilometers < 50000) rangeCounts['0-50k']++;
      else if (kilometers < 100000) rangeCounts['50k-100k']++;
      else if (kilometers < 150000) rangeCounts['100k-150k']++;
      else if (kilometers < 200000) rangeCounts['150k-200k']++;
      else rangeCounts['200k+']++;
    });
  
    return kilometerRanges.map(range => ({
      label: range,
      value: rangeCounts[range]
    }));
  }

  calculateMonthlyAdded(cars: any[]): CarData[] {
    const monthlyCounts = Array(12).fill(0);
    cars.forEach(car => {
      const month = new Date(car.createdAt).getMonth();
      monthlyCounts[month]++;
    });

    return monthlyCounts.map((count, index) => ({
      label: new Date(0, index).toLocaleString('default', { month: 'short' }),
      value: count
    }));
  }

  calculateByConsumption(cars: any[]): CarData[] {
    const consumptionBuckets = ['0-5 L/100km', '5-10 L/100km', '10-15 L/100km', '15+ L/100km'];
    const consumptionCounts = consumptionBuckets.reduce((acc, bucket) => {
      acc[bucket] = 0;
      return acc;
    }, {} as { [key: string]: number });
  
    cars.forEach(car => {
      const consumption = car.consumption;
      if (consumption <= 5) consumptionCounts['0-5 L/100km']++;
      else if (consumption <= 10) consumptionCounts['5-10 L/100km']++;
      else if (consumption <= 15) consumptionCounts['10-15 L/100km']++;
      else consumptionCounts['15+ L/100km']++;
    });
  
    return consumptionBuckets.map(bucket => ({
      label: bucket,
      value: consumptionCounts[bucket]
    }));
  }

  renderCharts(): void {
    Chart.register(...registerables);

    new Chart('chart-brand', {
      type: 'bar',
      data: {
        labels: this.carData.byBrand.map((item: CarData) => item.label),
        datasets: [{
          label: 'Number of Cars',
          data: this.carData.byBrand.map((item: CarData) => item.value),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true },
          tooltip: { callbacks: { label: tooltipItem => `${tooltipItem.label}: ${tooltipItem.raw}` } }
        }
      }
    });

    new Chart('chart-year', {
      type: 'bar',
      data: {
        labels: this.carData.byYear.map((item: CarData) => item.label),
        datasets: [{
          label: 'Number of Cars',
          data: this.carData.byYear.map((item: CarData) => item.value),
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true },
          tooltip: { callbacks: { label: tooltipItem => `${tooltipItem.label}: ${tooltipItem.raw}` } }
        }
      }
    });

    new Chart('chart-model', {
      type: 'pie',
      data: {
        labels: this.carData.byBrand.map((item: CarData) => item.label),
        datasets: [{
          label: 'Number of Cars by Brand',
          data: this.carData.byBrand.map((item: CarData) => item.value),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true },
          tooltip: {
            callbacks: {
              label: tooltipItem => `${tooltipItem.label}: ${tooltipItem.raw}`
            }
          }
        }
      }
    });

    new Chart('chart-fuel', {
      type: 'polarArea',
      data: {
        labels: this.carData.byFuel.map((item: CarData) => item.label),
        datasets: [{
          label: 'Number of Cars',
          data: this.carData.byFuel.map((item: CarData) => item.value),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true },
          tooltip: { callbacks: { label: tooltipItem => `${tooltipItem.label}: ${tooltipItem.raw}` } }
        }
      }
    });

    new Chart('chart-price-range', {
      type: 'bar',
      data: {
        labels: this.carData.byPriceRange.map((item: CarData) => item.label),
        datasets: [{
          label: 'Number of Cars',
          data: this.carData.byPriceRange.map((item: CarData) => item.value),
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true },
          tooltip: { callbacks: { label: tooltipItem => `${tooltipItem.label}: ${tooltipItem.raw}` } }
        }
      }
    });

    new Chart('chart-monthly', {
      type: 'line',
      data: {
        labels: this.carData.monthlyAdded.map((item: CarData) => item.label),
        datasets: [{
          label: 'Cars Added',
          data: this.carData.monthlyAdded.map((item: CarData) => item.value),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true },
          tooltip: { callbacks: { label: tooltipItem => `${tooltipItem.label}: ${tooltipItem.raw}` } }
        }
      }
    });

    new Chart('chart-kilometers', {
      type: 'line',
      data: {
        labels: this.carData.byKilometers.map((item: CarData) => item.label),
        datasets: [{
          label: 'Number of Cars by Kilometers',
          data: this.carData.byKilometers.map((item: CarData) => item.value),
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true },
          tooltip: { callbacks: { label: tooltipItem => `${tooltipItem.label}: ${tooltipItem.raw}` } }
        }
      }
    });

    new Chart('chart-consumption', {
      type: 'bar',
      data: {
        labels: this.carData.byConsumption.map((item: CarData) => item.label),
        datasets: [{
          label: 'Number of Cars',
          data: this.carData.byConsumption.map((item: CarData) => item.value),
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true },
          tooltip: { callbacks: { label: tooltipItem => `${tooltipItem.label}: ${tooltipItem.raw}` } }
        }
      }
    });
  }
}