import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipment } from '../equipmentClass'; // Adjust the path as needed
import { EquipmentType } from '../equipmentType';

@Injectable({
  providedIn: 'root'
})
export class EquipmentServiceService {
  private url = 'http://localhost:5196/api/Equipments';
  private equipmentTypesUrl = 'https://localhost:7149/api/EquipmentType';

  constructor(private http: HttpClient) { }

  // Create Equipment
  createEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(this.url, equipment, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Get All Equipments
  getAllEquipments(): Observable<Equipment[]> {
    return this.http.get<Equipment[]>(this.url);
  }

  // Get Equipment by ID
  getEquipmentById(id: number): Observable<Equipment> {
    const url = `${this.url}/${id}`;
    return this.http.get<Equipment>(url);
  }

  // Update Equipment
  updateEquipment(id: number, equipment: Equipment): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http.put<void>(url, equipment, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Get All Equipment Types
  getAllEquipmentTypes(): Observable<EquipmentType[]> {
  return this.http.get<EquipmentType[]>(this.equipmentTypesUrl);
  }

  // Delete Equipment
  deleteEquipment(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http.delete<void>(url);
  }
}
