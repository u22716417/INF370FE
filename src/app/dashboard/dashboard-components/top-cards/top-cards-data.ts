export interface topcard {
    bgcolor: string,
    icon: string,
    title: string,
    subtitle: string
}

export const topcards: topcard[] = [

    {
        bgcolor: 'success',
        icon: 'bi bi-wallet',
        title: 'R21k',
        subtitle: 'Yearly Earning'
    },
    {
        bgcolor: 'danger',
        icon: 'bi bi-coin',
        title: 'R1k',
        subtitle: 'Refund given'
    },
    {
        bgcolor: 'warning',
        icon: 'bi bi-basket3',
        title: '456',
        subtitle: 'Yearly Project'
    },
    {
        bgcolor: 'info',
        icon: 'bi bi-bag',
        title: '210',
        subtitle: 'Weekly Sales'
    },

] 

import { HttpClient,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardSalesService {
  

  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<any> {
  
    return this.http.get<any>('https://localhost:7149/api/Dashboard');
  }

  

}

