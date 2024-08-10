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



