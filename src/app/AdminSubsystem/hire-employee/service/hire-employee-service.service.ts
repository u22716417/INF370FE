import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HireEmployeeServiceService {
  private apiUrl = 'https://localhost:7149/api/Employees/HireEmployee';
  private adminUrl ='https://localhost:7149/api/Employees/GetAdmins';
  private titleUrl = 'https://localhost:7149/api/Users/Titles';

  constructor(private http: HttpClient) { }

  hireEmployee(employee: any): Observable<any> {
    return this.http.post(this.apiUrl, employee);
  }

  getEmployees():Observable<any>{
    return this.http.get(this.adminUrl);
  }

  getTitles(): Observable<any> {
    return this.http.get(this.titleUrl);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 400) {
      return throwError('Error: Password is incorrect');
    }
    return throwError('An unknown error occurred');
  }

}

export interface Employee {
  userId: number;
  userTypeId: number;
  username: string;
  userPassword: string;
  userEmail: string;
  userType: any; 
}

export interface EmployeeViewModel {
  UserId: number;
  Username: string;
  UserPassword: string;
  UserEmail: string;
  UserType_ID: 1;
}
