import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckOutService {
  private apiUrl = 'https://localhost:7149/api/Checkout/get-ticket-info'; 

  constructor(private http: HttpClient) {}

  checkOutByBarcode(barcodeNumber: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { barcode: barcodeNumber });
  }
}
