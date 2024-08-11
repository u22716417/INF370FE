import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesServiceService {
  
  
 

  private apiUrl = 'http://localhost:5196/api/Services'
 

  constructor(private http: HttpClient) { }

  createQuote(serviceId: number, start: string| null,end: string|null, currentUser: number ) : Observable<any>   {
    var payload = {
      start: start,
      end: end,
      userid: currentUser
    }
    return this.http.post<any>(`${this.apiUrl+'/CreateQuote'}/${serviceId}`, payload)
  }

  getBookingSchedule(serviceId: number): Observable<any[]>  
  {
    return this.http.get<any>(`${this.apiUrl+'/GetBookingSchedule'}/${serviceId}`)
  }

  getQuotes(userid: number): Observable<any[]>  
  {
    return this.http.get<any>(`${this.apiUrl+'/GetQuotes'}/${userid}`)
  }

  // Gets all services
  getAllServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.apiUrl)
  }

  // Gets a single service by ID
  getServiceById(id: number): Observable<Service> {
    return this.http.get<Service>(`${this.apiUrl}/${id}`)
    .pipe(map(result => result));
  }

  // Creates a new service
  createService(service: Service): Observable<Service> {
    return this.http.post<Service>(this.apiUrl, service)
    .pipe(map(result => result));
  }

  // Updates an existing venue
  updateService(service: Service): Observable<Service> {
    return this.http.put<Service>(`${this.apiUrl}/${service.serviceId}`, service)
    .pipe(map(result => result));
  }

  // Deletes service by Id
  deleteServiceById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }  
}



