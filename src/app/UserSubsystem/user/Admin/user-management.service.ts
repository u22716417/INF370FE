import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UserManagementService {


  private apiUrl = 'https://localhost:7149/api/Authentication/Authenticate';

  private  baseUrl = 'https://localhost:7149/api/Users';

  private apiOtp = 'https://localhost:7149/api/Authentication/AuthenticateOTP';

  constructor(private http: HttpClient) { }



  authenticate(username: string, password: string): Observable<boolean> {
    const loginData = { username, password };
    return this.http.post<boolean>(this.apiUrl, loginData)
      .pipe(
        catchError(this.handleError)
      );
  }
 
  authenticateOTP(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiOtp}/${id}`);
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 400) {
      return throwError('Error: Password is incorrect');
    }
    return throwError('An unknown error occurred');
  }

   // Get all users
   getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  // Get user by ID
  getUser(id: number): Observable<User> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<User>(url);
  }

  // Create a new user
  createUser(user: UserViewModel): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(this.baseUrl, user, { headers });
  }

  // Update an existing user
  updateUser(user: User): Observable<User> {
    const url = `${this.baseUrl}/${user.userId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<User>(url, user, { headers });
  }

  // Delete a user
  deleteUser(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<any>(url);
  }

}

export interface User {
  userId: number;
  userTypeId: number;
  username: string;
  userPassword: string;
  userEmail: string;
  userType: any; // Assuming userType can be any type
}

export interface UserViewModel {
  UserId: number;
  Username: string;
  UserPassword: string ;
  UserEmail: string;
  UserType_ID: number;
}

