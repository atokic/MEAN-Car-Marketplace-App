import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { CountryService } from '../../services/country.service';
import { Chart, registerables } from 'chart.js';

interface UserData {
  label: string;
  value: number;
}

@Component({
  selector: 'app-users-reports',
  templateUrl: './users-reports.component.html',
  styleUrls: ['./users-reports.component.css']
})
export class UsersReportsComponent implements OnInit {
  totalUsers: number = 0;
  userData: {
    byAgeRange: UserData[],
    byRole: UserData[],
    byCountry: UserData[],
    activeMonthly: UserData[]
  } = {
    byAgeRange: [],
    byRole: [],
    byCountry: [],
    activeMonthly: []
  };

  countries: string[] = []; // Array to store valid countries

  constructor(
    private usersService: UsersService,
    private countryService: CountryService // Inject the CountryService
  ) {}

  ngOnInit(): void {
    this.countries = this.countryService.getAllCountries(); // Initialize the countries list
    this.loadUserData();
  }

  loadUserData(): void {
    this.usersService.getAllUsers().subscribe(data => {
      this.totalUsers = data.length;

      this.userData.byAgeRange = this.calculateByAgeRange(data);
      this.userData.byRole = this.calculateByRole(data);
      this.userData.byCountry = this.calculateByCountry(data);
      this.userData.activeMonthly = this.calculateActiveMonthly(data);

      this.renderCharts();
    });
  }

  calculateByAgeRange(users: any[]): UserData[] {
    const ageRanges = ['<18', '18-24', '25-34', '35-44', '45-54', '55+'];
    const rangeCounts = ageRanges.reduce((acc, range) => {
      acc[range] = 0;
      return acc;
    }, {} as { [key: string]: number });

    users.forEach(user => {
      const age = user.age;
      if (age < 18) rangeCounts['<18']++;
      else if (age < 25) rangeCounts['18-24']++;
      else if (age < 35) rangeCounts['25-34']++;
      else if (age < 45) rangeCounts['35-44']++;
      else if (age < 55) rangeCounts['45-54']++;
      else rangeCounts['55+']++;
    });

    return ageRanges.map(range => ({
      label: range,
      value: rangeCounts[range]
    }));
  }

  calculateByRole(users: any[]): UserData[] {
    const roleCounts = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });

    return Object.keys(roleCounts).map(role => ({
      label: role,
      value: roleCounts[role]
    }));
  }

  calculateByCountry(users: any[]): UserData[] {
    const countryCounts = users.reduce((acc, user) => {
      if (this.countries.includes(user.address.country)) {
        acc[user.address.country] = (acc[user.address.country] || 0) + 1;
      }
      return acc;
    }, {} as { [key: string]: number });

    return Object.keys(countryCounts).map(country => ({
      label: country,
      value: countryCounts[country]
    }));
  }

  calculateActiveMonthly(users: any[]): UserData[] {
    const monthlyCounts = Array(12).fill(0);
    users.forEach(user => {
      const month = new Date(user.lastActiveAt).getMonth();
      monthlyCounts[month]++;
    });

    return monthlyCounts.map((count, index) => ({
      label: new Date(0, index).toLocaleString('default', { month: 'short' }),
      value: count
    }));
  }

  renderCharts(): void {
    Chart.register(...registerables);

    new Chart('chart-age-range', {
      type: 'bar',
      data: {
        labels: this.userData.byAgeRange.map((item: UserData) => item.label),
        datasets: [{
          label: 'Number of Users',
          data: this.userData.byAgeRange.map((item: UserData) => item.value),
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

    new Chart('chart-role', {
      type: 'pie',
      data: {
        labels: this.userData.byRole.map((item: UserData) => item.label),
        datasets: [{
          label: 'Number of Users',
          data: this.userData.byRole.map((item: UserData) => item.value),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
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

    new Chart('chart-country', {
      type: 'doughnut',
      data: {
        labels: this.userData.byCountry.map((item: UserData) => item.label),
        datasets: [{
          label: 'Number of Users',
          data: this.userData.byCountry.map((item: UserData) => item.value),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'],
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

    new Chart('chart-active-monthly', {
      type: 'line',
      data: {
        labels: this.userData.activeMonthly.map((item: UserData) => item.label),
        datasets: [{
          label: 'Active Users',
          data: this.userData.activeMonthly.map((item: UserData) => item.value),
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          borderColor: 'rgba(153, 102, 255, 1)',
          borderWidth: 1,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true },
          tooltip: { callbacks: { label: tooltipItem => `${tooltipItem.label}: ${tooltipItem.raw}` } }
        },
        scales: {
          x: { display: true },
          y: { display: true, beginAtZero: true }
        }
      }
    });
  }
}