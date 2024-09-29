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
  private idleTimeoutDuration = 2 * 60 * 1000; // Default fallback: 2 minutes
  countdownInterval: any; // Interval reference for countdown
  private countdownDuration = 60 * 1000; // 60 seconds countdown
  private logoutUrl = 'https://localhost:7149/api/Authentication/logout';

  public showWarningSubject = new Subject<boolean>();

  constructor(private router: Router, private http: HttpClient) {
    
    // Subscribe to router events to reset the idle timer when navigating
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.resetIdleTimer(true); // Ensure reset to full duration when navigating
      });

    // Check if idleTimeoutExpiry is already in localStorage
    const expiryTime = localStorage.getItem('idleTimeoutExpiry');
    if (expiryTime && Date.now() < parseInt(expiryTime, 10)) {
      this.resetIdleTimer(true); // Reset to the full duration on initial load
    } else {
      this.resetIdleTimer(true); // Reset to the full duration on initial load
    }

    this.attachUserActivityListeners();
  }

  // Attach global event listeners for user activity
  attachUserActivityListeners() {
    ['mousemove', 'mousedown', 'touchstart', 'click', 'keydown'].forEach((event) => {
      window.addEventListener(event, () => this.resetIdleTimer(true)); // Always reset to the full 2 minutes
    });
    window.addEventListener('scroll', () => this.resetIdleTimer(true), true);
  }

  resetIdleTimer(forceReset: boolean = false) {
  
    const excludedRoutes = ['/login', '/register', '/sign-up'];
    if (excludedRoutes.includes(this.router.url)) {
      this.clearTimers();
      return;
    }
  
    this.clearTimers(); // Ensure both idle and countdown timers are cleared
  
    // Retrieve the idleTimeoutDuration from localStorage or use the current set value
    const savedDuration = localStorage.getItem('idleTimeoutDuration');
    const newDurationMs = savedDuration ? parseInt(savedDuration, 10) : this.idleTimeoutDuration;
  
    if (forceReset) {
      this.idleTimeoutDuration = newDurationMs; // Use the value from localStorage or the updated value
    }
  
    // Update localStorage with the new expiry time
    const newExpiryTime = (Date.now() + this.idleTimeoutDuration).toString();
    localStorage.setItem('idleTimeoutExpiry', newExpiryTime);
  
    // Start idle timeout
    this.idleTimeout = setTimeout(() => {
      this.startCountdown(); // Start the countdown once idle timeout is reached
    }, this.idleTimeoutDuration);
  
  }
  

// Clear both idle and countdown timers
clearTimers() {
    if (this.idleTimeout) {
        clearTimeout(this.idleTimeout);
        this.idleTimeout = null;
    }

    if (this.countdownTimeout) {
        clearTimeout(this.countdownTimeout);
        this.countdownTimeout = null;
    }

    // Clear countdown interval (if any)
    if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
        this.countdownInterval = null;
    }
}

// Start the countdown (shows the warning)
startCountdown() {
    this.showWarningSubject.next(true); // Notify components to show the warning popup

    // Reset countdown value to 20 seconds
    let countdown = 20; 

    // Clear any previous intervals before starting a new one
    this.clearTimers(); // Ensure no countdowns are active

    this.countdownInterval = setInterval(() => {
        countdown--;
        if (countdown <= 0) {
            clearInterval(this.countdownInterval);
            this.logout(); // Log out the user when countdown reaches 0
        }
    }, 1000);

    // Start countdown timeout (logout after countdown ends)
    this.countdownTimeout = setTimeout(() => {
        this.logout();
    }, this.countdownDuration);
}


  // Extend the session (reset timers)
  extendSession() {
    this.clearTimers(); // Clear any existing timers
    this.resetIdleTimer(true); // Reset the idle timer to full 2 minutes and update localStorage
  }

  // Log the user out
  logout() {
    this.clearTimers(); // Clear any active timers
    localStorage.removeItem('idleTimeoutExpiry'); // Remove idleTimeoutExpiry from localStorage
    this.http.post(this.logoutUrl, {}).subscribe({
      next: () => {
        this.router.navigate(['/login']); // Redirect to the login page
      },
      error: (error) => {
        console.error('Logout failed', error);
      },
    });
  }

  setIdleTimeoutDuration(newDurationMs: number): void {
    // Clear any existing timers
    this.clearTimers();
    
    // Save the new duration in localStorage (in milliseconds)
    localStorage.setItem('idleTimeoutDuration', newDurationMs.toString());
    
    // Set the new idleTimeoutDuration and start the timer
    this.idleTimeoutDuration = newDurationMs;
    this.startIdleTimer(newDurationMs);
    
  }
  
  
  startIdleTimer(durationMs: number): void {
    this.idleTimeout = setTimeout(() => {
      this.startCountdown();
    }, durationMs);
  }
  
  
  
}
