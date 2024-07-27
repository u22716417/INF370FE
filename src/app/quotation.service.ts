import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuotationService {
  private baseUrl = 'https://localhost:7149/api/Quotation/list'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getQuotations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/list`);
  }

  createQuotation(formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, formData);
  }
}
