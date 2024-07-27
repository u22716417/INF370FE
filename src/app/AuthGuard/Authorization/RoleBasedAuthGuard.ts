import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './AuthGuard';

@Injectable({
  providedIn: 'root'
})
export class RoleBasedAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const allowedRoles = route.data['roles'] as string[]; // Get allowed roles from route data
    const currentUserRole = this.authService.getCurrentUserRole();

  if(currentUserRole)
    {
      if (allowedRoles.includes(currentUserRole)) 
        return true;
  
      this.router.navigate(['/access-denied']);
      return false;
    }
    this.router.navigate(['/access-denied']);
    return false;
  }
}
