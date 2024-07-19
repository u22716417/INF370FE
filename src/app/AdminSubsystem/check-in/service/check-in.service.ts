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

  checkIn(checkInViewModel: { barcode: string }): Observable<Attendee> {
    return this.http.post<Attendee>(this.apiUrl, checkInViewModel).pipe(
      catchError(error => {
        console.error('Error checking in', error);
        return throwError('Error checking in');
      })
    );
  }


}
