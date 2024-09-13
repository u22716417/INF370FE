import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutologoutService {

  private idleTimeout: any;
  private countdownTimeout: any;
  private idleTimeoutDuration = 40* 60 * 1000;  // 5 minutes in milliseconds
  private readonly countdownDuration = 60 * 1000;  // 60 seconds countdown
  private readonly logoutUrl = 'https://localhost:7149/api/Authentication/logout';  


   // Subject to notify components about showing the warnings
   public showWarningSubject = new Subject<boolean>();
   
  constructor(private router: Router, private http: HttpClient) {
    // Subscribe to router events to reset idle timer when navigating to a new page
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.resetIdleTimer();  // Reset idle timer when route changes
    });

    // Check for idle timeout on app initialization
  const expiryTime = localStorage.getItem('idleTimeoutExpiry');
  if (expiryTime && Date.now() > parseInt(expiryTime, 10)) {
    this.logout(); // Automatically logout if the idle timeout has expired
  } else {
    this.resetIdleTimer();  // Initialize idle timer
  }
  }

   // Method to update the idle timeout duration
   updateTimer(minutes: number) {
    this.idleTimeoutDuration = minutes * 60 * 1000; // Convert minutes to milliseconds
    localStorage.setItem('idleTimeoutDuration', this.idleTimeoutDuration.toString());
    this.resetIdleTimer();
  }

  resetIdleTimer() {
    this.clearTimers(); // Clear any existing timer
    
    // Check if the current route is not the login page
    const excludedRoutes = ['/login', '/register', '/sign-up'];
    if (excludedRoutes.includes(this.router.url)) {
      return;  // Do not trigger idle timer if on login or register screen
    }
  
    // Save the current time plus idle timeout duration to local storage
    const expiryTime = Date.now() + this.idleTimeoutDuration;
    localStorage.setItem('idleTimeoutExpiry', expiryTime.toString());
  
    // Set up a new idle timer
    this.idleTimeout = setTimeout(() => {
      this.startCountdown();  // Show countdown pop-up
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
  
  // Clear both idle and countdown timers and remove expiry time from local storage
  clearTimers() {
    if (this.idleTimeout) {
      clearTimeout(this.idleTimeout);
    }
    if (this.countdownTimeout) {
      clearTimeout(this.countdownTimeout);
    }
    localStorage.removeItem('idleTimeoutExpiry');
  }
  

  startCountdown() {
    this.showWarningSubject.next(true);  // Notify to show the warning popup

    let countdown = 60; // 60 seconds countdown

    const countdownInterval = setInterval(() => {
      countdown--;
      console.log(`You will be logged out in ${countdown} seconds.`);  // Log countdown (for debugging)

      if (countdown <= 0) {
        clearInterval(countdownInterval);
        this.logout();  // Log out the user after countdown
      }
    }, 1000);

    this.countdownTimeout = setTimeout(() => {
      clearInterval(countdownInterval);
      this.logout();  // Log out the user if countdown ends
    }, this.countdownDuration);
  }

 // Called when user extends the session
 extendSession() {
  console.log('Session extended');
  this.clearTimers();  // Clear both idle and countdown timers
  localStorage.removeItem('idleTimeoutExpiry');  // Remove expiry time from local storage
  this.resetIdleTimer();  // Reset the idle timer for the new session
}


  // Logout function
  logout() {
    this.clearTimers();
    this.http.post(this.logoutUrl, {}).subscribe({
      next: () => {
        this.router.navigate(['/login']);  // Redirect to login page
      },
      error: (error) => {
        console.error('Logout failed', error);
      }
    });
  }
}
