import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientProfile } from '../client-profile';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientProfileService {

private apiUrl = 'https://localhost:7149/api/ClientProfile'

  constructor(private httpClient: HttpClient) { }

  getAllClients(): Observable<ClientProfile[]> {
    return this.httpClient.get<ClientProfile[]>(this.apiUrl)
    .pipe(map(result=> result));
  }
  getClientProfile(id:number): Observable<ClientProfile[]> {
    return this.httpClient.get<ClientProfile[]>(this.apiUrl + '/' + id)
    .pipe(map(result=> result));
  }
}
