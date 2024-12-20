// hire-item.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HireItem } from '../HireItem';
import { ExistingEquipmentResponse } from '../hireEquipment/existing-equipment-response';



@Injectable({
  providedIn: 'root'
})
export class HireItemService {
   
  private baseUrl = 'https://localhost:7149/api';
  private apiUrl = 'https://localhost:7149/api/HireItem'; 
  private equipmentApiUrl = 'https://localhost:7149/api/Equipments';
  private quotationUrl = 'https://localhost:7149/api/EquipmentQuotations/CreateHireQuotation'


  constructor(private http: HttpClient) { }

  getHireItems(): Observable<HireItem[]> {
    return this.http.get<HireItem[]>(this.apiUrl);
  }

  collectItems(arg0: any): Observable<any>  {
    return this.http.get<any>('https://localhost:7149/CompleteItems/'+arg0)
  }

  returnItems(arg0: any): Observable<any>  {
    return this.http.get<any>('https://localhost:7149/ReturnItems/'+arg0)
  }

  getEquipmentOptions(): Observable<any[]> {
    return this.http.get<any[]>(this.equipmentApiUrl)
  }

  getHireItemsForToday(id: number): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7149/ClientCollectHireItems/'+id);
  }

  
  getAllHireItems(id: number): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7149/ClientCollectHireItems/'+id);
  }

  createHireItem(hireItem: HireItem): Observable<ExistingEquipmentResponse> {
    return this.http.post<ExistingEquipmentResponse>(this.apiUrl, hireItem);
  }



  createHireQuotation(hireRequest: any): Observable<any> {
    return this.http.post(this.quotationUrl, hireRequest).pipe(
      catchError(this.handleError)
    );

}

private handleError(error: any): Observable<never> {
  console.error('An error occurred:', error);
  return throwError(error);
}

}