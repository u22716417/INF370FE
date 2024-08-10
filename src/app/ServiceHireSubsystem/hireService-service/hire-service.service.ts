import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ServiceSchedule } from '../HireService';
@Injectable({
  providedIn: 'root'
})
export class HireServiceService {

  private baseUrl = 'https://localhost:7149/api';
  private apiUrl = 'https://localhost:7149/api/HireService'; 
  private serviceApiUrl = 'https://localhost:7149/api/Services';
  private quotationUrl = 'https://localhost:7149/api/ServiceQuotation/CreateServiceQuotation'


  constructor(private http: HttpClient) { }

  getHireServices(): Observable<ServiceSchedule[]> {
    return this.http.get<ServiceSchedule[]>(this.apiUrl);
  }

  getServiceOptions(): Observable<string[]> {
    return this.http.get<any[]>(this.serviceApiUrl)
  }

  createHireService(HireService: ServiceSchedule): Observable<ServiceSchedule> {
    return this.http.post<ServiceSchedule>(this.apiUrl, HireService);
  }



  createHireQuotation(hireRequest: any): Observable<any> {
    return this.http.post(this.quotationUrl, hireRequest).pipe(
      catchError(this.handleError)
    );

}

private handleError(error: any): Observable<never> {
  console.error('An error occurred:', error);
  return throwError(error);
}

}

