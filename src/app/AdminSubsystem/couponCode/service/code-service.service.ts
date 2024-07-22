import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CouponCode } from '../couponCode';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CodeServiceService {
  private apiUrl = 'http://localhost:5196/api/CouponCodes';
  private couponCodes: CouponCode[] = [];

  constructor(private http: HttpClient) { }


  generateCouponCode(description: string, discountAmount: number): Observable<any> {
    const payload: any = { description, discountAmount };
    return this.http.post<CouponCode>(this.apiUrl + '/GenerateCode', payload);
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