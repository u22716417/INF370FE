// hire-item.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { EquipmentQuotationViewModel, HireItem } from '../HireItem';


@Injectable({
  providedIn: 'root'
})
export class HireItemService {
  private baseUrl = 'https://localhost:7149/api';
  private apiUrl = 'https://localhost:7149/api/HireItem'; 
  private equipmentApiUrl = 'https://localhost:7149/api/Equipments';


  constructor(private http: HttpClient) { }

  getHireItems(): Observable<HireItem[]> {
    return this.http.get<HireItem[]>(this.apiUrl);
  }

  getEquipmentOptions(): Observable<string[]> {
    return this.http.get<any[]>(this.equipmentApiUrl).pipe(
      map(response => response.map(item => item.equipmentName))
    );
  }

  createHireItem(hireItem: HireItem): Observable<HireItem> {
    return this.http.post<HireItem>(this.apiUrl, hireItem);
  }

  createQuotation(model: EquipmentQuotationViewModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/EquipmentQuotations`, model);
  }

 



}
