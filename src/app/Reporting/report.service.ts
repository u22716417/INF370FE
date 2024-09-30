import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  
  private apiUrl = 'https://localhost:7149/api/UnsoldReport/unsold-tickets';  

 
  private apiUrl3 = 'https://localhost:7149/api/Services/HireServiceReport'

  private apiUrl4 = 'https://localhost:7149/api/Events/GenerateEventAttendanceReport';

  

  constructor(private http: HttpClient) { }

  getUnsoldTicketsReport(): Observable<any[]> {
  
    return this.http.get<any[]>('https://localhost:7149/api/Events/UnTicketSalesReport');
  }

  getTicketSalesReport(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7149/api/Events/TicketSalesReport');
  }

  getCustomerSatisfactionReport(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7149/api/Events/CustomerSatisfaction');
  }

  getEventAttendanceReport(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl4}`);
  }

  getServiceReportData(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7149/api/Services/GetServices');
  }
 

 getHireServiceReport(): Observable<any[]> {
  return this.http.get<any[]>(this.apiUrl3);
}

  getEventAttendanceDetails(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7149/api/Events/GenerateEventAttendanceDetailedReport');
  }


}

