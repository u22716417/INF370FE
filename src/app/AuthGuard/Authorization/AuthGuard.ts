import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  getCurrentUserRole(): string | null {
    const currentUser = sessionStorage.getItem('CurrentUser');
    return currentUser ? currentUser : null;
  }

  canActivateAdmin(): boolean {
    const role = this.getCurrentUserRole();
    if (role === 'Admin') {
      return true;
    } else {
      this.router.navigate(['/access-denied']);
      return false;
    }
  }

  canActivateClient(): boolean {
    const role = this.getCurrentUserRole();
    if (role === 'Client') {
      return true;
    } else {
      this.router.navigate(['/access-denied']);
      return false;
    }
  }

  canActivateOwner(): boolean {
    const role = this.getCurrentUserRole();
    if (role === 'Owner') {
      return true;
    } else {
      this.router.navigate(['/access-denied']);
      return false;
    }
  }
}
