import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders  } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Car } from '../services/models';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private apiUrl = '/api/cars';

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl);
  }

  getCarsByUser(): Observable<Car[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Car[]>(`${this.apiUrl}/user`, { headers });
  }

  createCar(car: Omit<Car, 'carID' | 'user' | 'createdAt'>): Observable<Car> {
    const headers = this.getAuthHeaders();
    return this.http.post<Car>(this.apiUrl, car, { headers }).pipe(
      catchError(error => {
        if (error.status === 400) {
          return throwError(error.error.errors[0].msg);
        }
        return throwError('Creation failed. Please try again.');
      })
    );
  }

  updateCar(id: string, car: Car): Observable<Car> {
    const headers = this.getAuthHeaders();
    return this.http.put<Car>(`${this.apiUrl}/${id}`, car, { headers });
  }

  deleteCar(id: string): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  getCarById(id: string): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`);
  }

  formatPrice(price: number): string {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 });
  }

  formatKilometers(kilometers: number): string {
    return kilometers.toLocaleString();
  }

  formatConsumption(consumption: number): string {
    return consumption.toFixed(1);
  }
}
