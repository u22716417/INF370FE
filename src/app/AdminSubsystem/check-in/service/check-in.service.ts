import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Attendee } from '../classes/check-in'; // Assuming the class name is 'attendee'

@Injectable({
  providedIn: 'root'
})
export class CheckInService {

  private apiUrl = 'https://localhost:7149/api/CheckIn/CheckInImage';
  private validateUrl = 'https://localhost:7149/api/CheckIn/ValidateBarcode';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {}

  // Validate Barcode
  validateBarcode(barcode: string): Observable<boolean> {
    return this.http.post<boolean>(this.validateUrl, JSON.stringify(barcode), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
     
  }

  checkInImage(imageData: any): Observable<any> {
    const formData = new FormData();
    formData.append('qrCodeImage', imageData);

    return this.http.post<any>(this.apiUrl, formData)
      .pipe(
        catchError(this.handleError)
      );
  }
  

  // Error Handling
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      console.error('Client-side error:', error.error.message);
    } else {
      // Server-side error
      console.error(`Server-side error: ${error.status} - ${error.message}`);
    }
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
