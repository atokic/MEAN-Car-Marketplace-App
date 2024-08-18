import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { SignupResponse, LoginResponse, User } from '../services/models';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private roleSubject = new BehaviorSubject<string | null>(null);
  private usernameSubject = new BehaviorSubject<string | null>(null);
  private userProfileSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {
    this.loadUserFromToken();
  }

  signup(userData: any): Observable<SignupResponse> {
    return this.http.post<SignupResponse>(`${this.apiUrl}/users`, userData).pipe(
      catchError(error => {
        if (error.status === 400) {
          return throwError(error.error.errors[0].msg);
        }
        return throwError('Signup failed. Please try again.');
      })
    );
  }

  private loadUserFromToken() {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.isAuthenticatedSubject.next(true);
        this.usernameSubject.next(decoded.user?.username || null);
        this.roleSubject.next(decoded.user?.role || null);
        //this.getUserProfile().subscribe(); // Fetch and update the user profile
      } catch (e) {
        this.logout();
      }
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth`, { email, password }).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        this.loadUserFromToken();
      }),
      catchError(err => {
        console.error('Login failed', err);
        return throwError(err);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.isAuthenticatedSubject.next(false);
    this.roleSubject.next(null);
    this.usernameSubject.next(null);
    this.userProfileSubject.next(null);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getUserRole(): Observable<string | null> {
    return this.roleSubject.asObservable();
  }

  getUsername(): Observable<string | null> {
    return this.usernameSubject.asObservable();
  }

  isAdmin(): Observable<boolean> {
    return this.roleSubject.asObservable().pipe(map(role => role === 'admin'));
  }

  isUser(): Observable<boolean> {
    return this.roleSubject.asObservable().pipe(map(role => role === 'user'));
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
