import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CheckInComponent } from '../check-in.component';
import { catchError, Observable, throwError } from 'rxjs';
import { Attendee } from '../classes/check-in';

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  private apiUrl = 'http://localhost:7149/api/CheckIn';

  constructor(private http: HttpClient) { }

  checkIn(checkInViewModel: { barcode: string }): Observable<Attendee> {
    const payload = {
      barcode: checkInViewModel.barcode,
      attendeeName: 'John',
      attendeeSurname: 'Doe',
      attendeeEmail: 'john.doe@example.com',
      attendeePhone: '1234567890',
      titleId: 1
    };

    return this.http.post<Attendee>(`${this.apiUrl}/checkIn`, payload).pipe(
      catchError(error => {
        console.error('Error checking in', error);
        return throwError('Error checking in');
      })
    );
  }


}
