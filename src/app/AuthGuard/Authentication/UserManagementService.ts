
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private apiUrl = 'https://localhost:7149/api/Authentication/Authenticate';
  private apiUrlBase = 'https://localhost:7149/api/Authentication/';

  private baseUrl = 'https://localhost:7149/api/Users';
  private apiOtp = 'https://localhost:7149/api/Authentication/AuthenticateOTP';

  constructor(private http: HttpClient) { }

  authenticate(username: string, password: string): Observable<boolean> {
    const loginData = { username, password };
    return this.http.post<boolean>(this.apiUrl, loginData).pipe(
      catchError(this.handleError)
    );
  }

  signup(signupData: any): Observable<any> {
    console.log(signupData);
    return this.http.post(`${this.baseUrl}/Register`, signupData);
  }

  resetPassword(username: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post(this.apiUrlBase+'ResetPassword', JSON.stringify(username), { headers });
  }
  authenticateOTP(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiOtp}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('CurrentUser') !== null;
  }

  logout() {
    sessionStorage.removeItem('CurrentUserId');
    sessionStorage.removeItem('CurrentUser');
  }

  // Get all users
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  getcurrentUserID(): number
  {
    var id = sessionStorage.getItem('CurrentUserId')
      if(id)
      {
         var cid = parseInt(id);
         return cid; 
      }
      return 0;
  }
  // Get user by ID
  getUser(): Observable<any> {
    var id = sessionStorage.getItem('CurrentUserId')
    const url = `${this.baseUrl}/vm/${id}`;
    return this.http.get<any>(url).pipe(
      catchError(this.handleError)
    );
  }


  getUserProfile(userId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/profile/${userId}`);
  }

  // Create a new user
  createUser(user: UserViewModel): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<User>(this.baseUrl, user, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Update an existing user
  updateUser(user: User): Observable<User> {
    const url = `${this.baseUrl}/${user.userId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<User>(url, user, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a user
  deleteUser(id: number): Observable<any> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<any>(url).pipe(
      catchError(this.handleError)
    );
  }

  updateUserProfile(profile:any):Observable<any> 
  {
    return this.http.put<any>(`${this.baseUrl}/update/${profile.userId}`, profile);
  }

  updateUserProfilePasswords(passwords:any):Observable<any> 
  {
    return this.http.put<any>(`${this.baseUrl}/updatePassword/${passwords.userId}`, passwords);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 400) {
      return throwError('Error: Password is incorrect');
    }
    return throwError('An unknown error occurred');
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
  UserPassword: string;
  UserEmail: string;
  UserType_ID: number;
}
