import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CheckInComponent } from '../check-in.component';
import { catchError, Observable, throwError } from 'rxjs';
import { Attendee } from '../classes/check-in';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  private apiUrl = 'http://localhost:5196/api/CheckIn';

  constructor(private http: HttpClient) { }

  checkIn(CheckInComponent: CheckInComponent): Observable<Attendee> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<Attendee>(this.apiUrl, CheckInComponent, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError('Something went wrong; please try again later.');
  }
}
