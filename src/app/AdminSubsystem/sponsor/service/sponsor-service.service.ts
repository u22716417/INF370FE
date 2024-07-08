import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sponsor } from '../sponsor';

@Injectable({
  providedIn: 'root'
})
export class SponsorServiceService {

  private apiUrl = 'http://localhost:5196/api/Sponsors';
  
  constructor(private http: HttpClient) { }

  getSponsors(): Observable<Sponsor[]> {
    return this.http.get<Sponsor[]>(this.apiUrl);
  }

  getSponsorById(sponsorId: number): Observable<Sponsor> {
    return this.http.get<Sponsor>(`${this.apiUrl}/${sponsorId}`);
  }

  createSponsor(sponsor: Sponsor): Observable<Sponsor> {
    return this.http.post<Sponsor>(this.apiUrl, sponsor);
  }

  updateSponsor(sponsorId: number, sponsor: Sponsor): Observable<Sponsor> {
    return this.http.put<Sponsor>(`${this.apiUrl}/${sponsorId}`, sponsor);
  }

  deleteSponsor(sponsorId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${sponsorId}`);
  }
}
