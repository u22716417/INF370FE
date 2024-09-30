// src/app/services/equipment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Equipment } from '../equipmentClass';
import { EquipmentType } from '../equipmentType';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private apiUrl = 'https://localhost:7149/api/Equipments';
  private apiUrl2='https://localhost:7149/api/EquipmentType';

  constructor(private http: HttpClient) {}

  // Get all equipment

  getEquipments(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  // Get equipment by ID
  getEquipmentById(id: number): Observable<Equipment> {
    return this.http.get<Equipment>(`${this.apiUrl}/${id}`);
  }

  // Add new equipment
  addEquipment(equipment: Equipment): Observable<Equipment> {
    return this.http.post<Equipment>(this.apiUrl, equipment);
  }

  // Update existing equipment
  updateEquipment(id: number, equipment: any): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, equipment);
  }

  // Delete (soft delete) equipment
  deleteEquipment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Correct method in EquipmentService
getEquipmentTypes(): Observable<EquipmentType[]> {
  return this.http.get<EquipmentType[]>(this.apiUrl2);
}

}
