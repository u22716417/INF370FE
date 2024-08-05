import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Faq } from '../faq';


@Injectable({
  providedIn: 'root'
})
export class FaqService {

  private apiUrl = 'https://localhost:7149/api/Faqs'; 

  constructor(private http: HttpClient) { }

  // Gets all faqs
  getAllFaqs(): Observable<Faq[]> {
    return this.http.get<Faq[]>(this.apiUrl)
  }

  // Gets a single faq by ID
  getFaqById(id: number): Observable<Faq> {
    return this.http.get<Faq>(`${this.apiUrl}/${id}`)
    .pipe(map(result => result));
  }

  // Creates a new faq
  createFaq(faq: Faq): Observable<Faq> {
    return this.http.post<Faq>(this.apiUrl, faq)
    .pipe(map(result => result));
  }

  // Updates an existing faq
  updateFaq(faqId: number, faq: Faq): Observable<Faq> {
    return this.http.put<Faq>(`${this.apiUrl}/${faq.faqId}`, faq)
    .pipe(map(result => result));
  }
 
  // Deletes a faq
  deleteFaq(id: number): Observable<Faq> {
    return this.http.delete<Faq>(`${this.apiUrl}/${id}`)
    .pipe(map(result => result));;
  }

  //Deletes faq by Id
  deleteFaqById(id: number): Observable<Faq> {
    return this.http.delete<Faq>(`${this.apiUrl}/${id}`)
    .pipe(map(result => result));
}
}
