// venue.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Venue } from '../venue';


@Injectable({
  providedIn: 'root'
})
export class VenueService {
  private apiUrl = 'http://localhost:5196/api/Venues'; 

  constructor(private http: HttpClient) { }

  // Gets all venues
  getAllVenues(): Observable<Venue[]> {
    return this.http.get<Venue[]>(this.apiUrl)
  }

  // Gets a single venue by ID
  getVenueById(id: number): Observable<Venue> {
    return this.http.get<Venue>(`${this.apiUrl}/${id}`)
    .pipe(map(result => result));
  }

  // Creates a new venue
  createVenue(venue: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, venue).pipe(map(result => result));
  }
  
  importVenues(venues: Venue[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/import`, venues);
  }

  // Updates an existing venue
  updateVenue(venue: Venue): Observable<Venue> {
    return this.http.put<Venue>(`${this.apiUrl}/${venue.venueId}`, venue)
    .pipe(map(result => result));
  }

  

  // Deletes a venue
  deleteVenue(id: number): Observable<Venue> {
    return this.http.delete<Venue>(`${this.apiUrl}/${id}`)
    .pipe(map(result => result));;
  }

  //Deletes Venue by Id
  deleteVenueById(id: number): Observable<Venue> {
    return this.http.delete<Venue>(`${this.apiUrl}/${id}`)
    .pipe(map(result => result));
}



}