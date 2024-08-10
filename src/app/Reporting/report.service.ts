import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  
  private apiUrl = 'https://localhost:7149/api/UnsoldReport/unsold-tickets';  

  //private apiUrl1 = 'https://localhost:7149/api/UnsoldReport/unsold-tickets'; 
  //private apiUrl2 = 'https://localhost:7149/api/UnsoldReport/unsold-tickets';

  private apiUrl3 = 'https://localhost:7149/api/Services/HireServiceReport'

  constructor(private http: HttpClient) { }

  getUnsoldTicketsReport(month?: string): Observable<any[]> {
    let params = new HttpParams();
    if (month) {
      params = params.append('month', month);
    }
    return this.http.get<any[]>(this.apiUrl, { params });
  }

  getTicketSalesReport(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getCustomerSatisfactionReport(): Observable<any[]> {
 return this.http.get<any[]>('https://localhost:7149/api/Events/CustomerSatisfaction');
 }

 getHireServiceReport(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl3);
}
}
