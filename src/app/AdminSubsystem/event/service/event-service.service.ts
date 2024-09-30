import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../eventClass';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  private apiUrl = 'https://localhost:7149/api/Events';
  private venueUrl = 'http://localhost:5196/api/Venues'
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // Get all events
  getEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.apiUrl);
  }

  // Get a single event by ID
  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/${id}`); // Use full URL
  }

  // Create a new event
  createEvent(event: any): Observable<any> {
    console.log(event);
    return this.http.post<any>(this.apiUrl + '/CreateEvent', event);
  }

  // Update an existing event
  updateEvent(event: any, eventId:number): Observable<Event> {
    const url = `${this.apiUrl}/${eventId}`;
    console.log("Hitting: ", url);
    console.log(event);
    return this.http.put<any>(url, event);
  }

  // Delete an event
  deleteEvent(id: number): Observable<void> {
    const url = `${this.apiUrl}/deleteEvent/${id}`;
    return this.http.delete<void>(url, this.httpOptions);
  }
  

  importEvnts(events: Event[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/import`, events);
  }
}
