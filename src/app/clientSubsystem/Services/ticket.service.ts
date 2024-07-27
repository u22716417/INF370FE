import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {


  url = 'https://localhost:7149/api/Events/getEvents';  // Get All events


  constructor(private http: HttpClient) { }

  getAllEvents(): Observable<any[]> {
    
    return this.http.get<any[]>(this.url);
  }

}
