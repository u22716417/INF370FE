import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event } from '../eventClass';

@Injectable({
  providedIn: 'root'
})
export class EventServiceService {

  private apiUrl = 'http://localhost:5196/api/Events';
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
  getEventById(eventId: number): Observable<Event> {
    const url = `${this.apiUrl}/${eventId}`;
    return this.http.get<Event>(url);
  }

  // Create a new event
  createEvent(event: Event): Observable<Event> {
    return this.http.post<Event>(this.apiUrl, event, this.httpOptions);
  }

  // Update an existing event
  updateEvent(event: Event): Observable<Event> {
    const url = `${this.apiUrl}/${event.id}`;
    return this.http.put<Event>(url, event, this.httpOptions);
  }

  // Delete an event
  deleteEvent(eventId: number): Observable<void> {
    const url = `${this.apiUrl}/${eventId}`;
    return this.http.delete<void>(url, this.httpOptions);
  }
}
