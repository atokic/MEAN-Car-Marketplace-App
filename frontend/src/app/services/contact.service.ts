import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://your-backend-api-endpoint.com/contact'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  submitContactForm(formData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }
}
