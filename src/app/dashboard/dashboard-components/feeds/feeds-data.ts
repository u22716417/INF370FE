export interface Feed {
    class: string,
    icon: string,
    task: string,
    time: string
}

export const Feeds: Feed[] = [

    {
        class: 'bg-info',
        icon: 'bi bi-bell',
        task: 'You have 4 pending tasks.',
        time: 'Just Now'
    },
    {
        class: 'bg-success',
        icon: 'bi bi-hdd',
        task: 'Server #1 overloaded.',
        time: '2 Hours ago'
    },
    {
        class: 'bg-warning',
        icon: 'bi bi-bag-check',
        task: 'New order received.',
        time: '31 May'
    },
    {
        class: 'bg-danger',
        icon: 'bi bi-person',
        task: 'New user registered.',
        time: '30 May'
    },
    {
        class: 'bg-primary',
        icon: 'bi bi-person',
        task: 'You have new password.',
        time: '21 May'
    },

] 

import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  

  constructor(private http: HttpClient) { }

  getFeed(): Observable<any[]> {
  
    return this.http.get<any[]>('https://localhost:7149/api/Feed');
  }

  postFeed(feed: any): Observable<Feed> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>('https://localhost:7149/api/Feed', feed, { headers });
  }

  


}

