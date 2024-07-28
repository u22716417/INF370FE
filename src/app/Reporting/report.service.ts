import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  
  private apiUrl = 'https://localhost:7149/api/Events/TicketSalesReport'; // Update with your actual API URL

  private apiUrl1 = 'https://localhost:7149/api/Events/UnTicketSalesReport'; // Update with your actual API URL


  constructor(private http: HttpClient) { }

  getTicketSalesReport(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getUnSoldTicketSalesReport(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl1);
  }
}
