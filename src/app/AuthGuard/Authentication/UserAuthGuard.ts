import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserManagementService } from './UserManagementService';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuard implements CanActivate {

  constructor(private authService: UserManagementService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
