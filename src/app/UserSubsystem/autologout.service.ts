import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AutologoutService {

  private idleTimeout: any;
  private readonly idleTimeoutDuration = 60 * 1000;  // 60 seconds in milliseconds
  private readonly logoutUrl = 'https://localhost:7149/api/Authentication/logout';  


  constructor(private router: Router, private http: HttpClient) {
    this.resetIdleTimer(); // Initialize idle timer
  }

  resetIdleTimer() {
    this.clearIdleTimer(); // Clear any existing timer

    // Set up a new idle timer
    this.idleTimeout = setTimeout(() => {
      this.logout();
    }, this.idleTimeoutDuration);

    // Reset the idle timer on user activity
    window.onload = this.resetIdleTimer.bind(this);
    window.onmousemove = this.resetIdleTimer.bind(this);
    window.onmousedown = this.resetIdleTimer.bind(this);
    window.ontouchstart = this.resetIdleTimer.bind(this);
    window.onclick = this.resetIdleTimer.bind(this);
    window.onkeydown = this.resetIdleTimer.bind(this);
    window.addEventListener('scroll', this.resetIdleTimer.bind(this), true);
  }

  clearIdleTimer() {
    if (this.idleTimeout) {
      clearTimeout(this.idleTimeout);
    }
  }

  logout() {
    this.clearIdleTimer();
    
    // Call API to log out the user on the server
    this.http.post(this.logoutUrl, {}).subscribe({
      next: () => {
        this.router.navigate(['/login']);  // Navigate to login page on successful logout
      },
      error: (error) => {
        console.error('Logout failed', error);  // Handle errors
      }
    });
  }
}
