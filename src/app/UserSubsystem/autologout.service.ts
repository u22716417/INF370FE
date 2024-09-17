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
    console.log('AutologoutService initialized');
    
    // Subscribe to router events to reset the idle timer when navigating
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        console.log(`Navigated to: ${this.router.url}`);
        this.resetIdleTimer(true); // Ensure reset to full duration when navigating
      });

    // Check if idleTimeoutExpiry is already in localStorage
    const expiryTime = localStorage.getItem('idleTimeoutExpiry');
    if (expiryTime && Date.now() < parseInt(expiryTime, 10)) {
      console.log('Idle timeout found in localStorage. Resetting timer.');
      this.resetIdleTimer(true); // Reset to the full duration on initial load
    } else {
      console.log('No idle timeout found. Starting new timer.');
      this.resetIdleTimer(true); // Reset to the full duration on initial load
    }

    this.attachUserActivityListeners();
  }

  // Attach global event listeners for user activity
  attachUserActivityListeners() {
    console.log('Attaching user activity listeners');
    ['mousemove', 'mousedown', 'touchstart', 'click', 'keydown'].forEach((event) => {
      window.addEventListener(event, () => this.resetIdleTimer(true)); // Always reset to the full 2 minutes
    });
    window.addEventListener('scroll', () => this.resetIdleTimer(true), true);
  }

  resetIdleTimer(forceReset: boolean = false) {
    console.log(`Current route: ${this.router.url}`);
  
    const excludedRoutes = ['/login', '/register', '/sign-up'];
    if (excludedRoutes.includes(this.router.url)) {
      console.log('Excluded route. Clearing timers and skipping idle timer.');
      this.clearTimers();
      return;
    }
  
    console.log('Resetting idle timer');
    this.clearTimers(); // Ensure both idle and countdown timers are cleared
  
    // Retrieve the idleTimeoutDuration from localStorage or use the current set value
    const savedDuration = localStorage.getItem('idleTimeoutDuration');
    const newDurationMs = savedDuration ? parseInt(savedDuration, 10) : this.idleTimeoutDuration;
  
    if (forceReset) {
      console.log(`Force resetting idle timer to new duration: ${newDurationMs / (60 * 1000)} minutes.`);
      this.idleTimeoutDuration = newDurationMs; // Use the value from localStorage or the updated value
    }
  
    // Update localStorage with the new expiry time
    const newExpiryTime = (Date.now() + this.idleTimeoutDuration).toString();
    localStorage.setItem('idleTimeoutExpiry', newExpiryTime);
    console.log(`New expiry time set in localStorage: ${newExpiryTime}`);
  
    // Start idle timeout
    this.idleTimeout = setTimeout(() => {
      console.log('Idle timeout reached. Starting countdown.');
      this.startCountdown(); // Start the countdown once idle timeout is reached
    }, this.idleTimeoutDuration);
  
    console.log(`Idle timer set for ${this.idleTimeoutDuration / 1000} seconds.`);
  }
  

// Clear both idle and countdown timers
clearTimers() {
    if (this.idleTimeout) {
        console.log('Clearing idle timer.');
        clearTimeout(this.idleTimeout);
        this.idleTimeout = null;
    }

    if (this.countdownTimeout) {
        console.log('Clearing countdown timer.');
        clearTimeout(this.countdownTimeout);
        this.countdownTimeout = null;
    }

    // Clear countdown interval (if any)
    if (this.countdownInterval) {
        console.log('Clearing countdown interval.');
        clearInterval(this.countdownInterval);
        this.countdownInterval = null;
    }
}

// Start the countdown (shows the warning)
startCountdown() {
    console.log('Starting countdown');
    this.showWarningSubject.next(true); // Notify components to show the warning popup

    // Reset countdown value to 20 seconds
    let countdown = 20; 
    console.log('Countdown reset to 20 seconds.');

    // Clear any previous intervals before starting a new one
    this.clearTimers(); // Ensure no countdowns are active

    this.countdownInterval = setInterval(() => {
        countdown--;
        console.log(`Countdown: ${countdown} seconds left.`);
        if (countdown <= 0) {
            clearInterval(this.countdownInterval);
            this.logout(); // Log out the user when countdown reaches 0
        }
    }, 1000);

    // Start countdown timeout (logout after countdown ends)
    this.countdownTimeout = setTimeout(() => {
        console.log('Countdown completed. Logging out.');
        this.logout();
    }, this.countdownDuration);
}


  // Extend the session (reset timers)
  extendSession() {
    console.log('Session extended. Resetting timers.');
    this.clearTimers(); // Clear any existing timers
    this.resetIdleTimer(true); // Reset the idle timer to full 2 minutes and update localStorage
  }

  // Log the user out
  logout() {
    console.log('Logging out the user.');
    this.clearTimers(); // Clear any active timers
    localStorage.removeItem('idleTimeoutExpiry'); // Remove idleTimeoutExpiry from localStorage
    this.http.post(this.logoutUrl, {}).subscribe({
      next: () => {
        console.log('Logout successful. Redirecting to login.');
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
    
    console.log('New auto-logout timer set to:', newDurationMs / (60 * 1000), 'minutes');
  }
  
  
  startIdleTimer(durationMs: number): void {
    this.idleTimeout = setTimeout(() => {
      console.log('Idle timeout reached. Starting countdown.');
      this.startCountdown();
    }, durationMs);
    console.log(`Idle timer set for ${durationMs / (60 * 1000)} minutes.`);
  }
  
  
  
}
