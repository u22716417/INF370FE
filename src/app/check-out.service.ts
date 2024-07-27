import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
  private apiUrl = 'https://localhost:7149/api/Checkout/check-out'; // Ensure this is the correct URL

  constructor(private http: HttpClient) {}

  checkOutByBarcode(barcodeNumber: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { barcodeNumber }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    // Log the error or notify the user
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }
}

