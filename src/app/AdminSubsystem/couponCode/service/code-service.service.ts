import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CouponCode } from '../couponCode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeServiceService {
  private apiUrl = 'https://localhost:7149/api/CouponCodes';
  private emailUrl = 'https://localhost:7149/api/CouponCodes/SendCouponCodeEmail';

  constructor(private http: HttpClient) { }

  generateCouponCode(couponCodeData: { description: string, discountAmount: number }): Observable<CouponCode> {
    return this.http.post<CouponCode>(`${this.apiUrl}/GenerateCode`, null, {
      params: new HttpParams()
        .set('description', couponCodeData.description)
        .set('discountAmount', couponCodeData.discountAmount.toString())
    });
  }

  getAllCodes(): Observable<CouponCode[]> {
    return this.http.get<CouponCode[]>(this.apiUrl);
  }

  getCodeById(id: number): Observable<CouponCode | undefined> {
    return this.http.get<CouponCode>(`${this.apiUrl}/${id}`);
  }

  deleteCodeById(id: number): Observable<CouponCode> {
    return this.http.delete<CouponCode>(`${this.apiUrl}/${id}`);
  }

  sendCouponCodeEmail(sponsorId: number, couponCodeId: number): Observable<any> {
    const payload = {
      SponsorId: sponsorId,
      CouponCodeId: couponCodeId
    };
    return this.http.post(`${this.emailUrl}/SendCouponCodeEmail`, payload);
  }
}
