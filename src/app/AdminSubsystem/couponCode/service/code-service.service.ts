import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CouponCode } from '../couponCode';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeServiceService {
  private apiUrl = 'https://localhost:7149/api/CouponCodes';
  private couponCodes: CouponCode[] = [];

  constructor(private http: HttpClient) { }

  

  generateCouponCode(couponCodeData: CouponCode): Observable<CouponCode> {
    return this.http.post<CouponCode>(`${this.apiUrl}/generate-coupon`, couponCodeData);
  }

 
getAllCodes(): Observable<CouponCode[]> {
  return this.http.get<CouponCode[]>(this.apiUrl)
}

getCodeById(id: number): Observable<CouponCode | undefined> {
  const couponCode = this.couponCodes.find(code => code.couponCodeId === id);
  return of(couponCode);
}


deleteCodeById(id: number): Observable<CouponCode> {
  return this.http.delete<CouponCode>(`${this.apiUrl}/${id}`)
  .pipe(map(result => result));
}
}