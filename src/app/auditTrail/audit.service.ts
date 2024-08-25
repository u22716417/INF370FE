import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuditService {

  private apiUrl = 'https://localhost:7149/api/Audit'; // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  getAuditLogs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

}