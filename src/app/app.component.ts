import { Component, HostListener, OnInit } from '@angular/core';
import { AutologoutService } from './UserSubsystem/autologout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showWarning: boolean = false;
  countdown: number = 60;  // Countdown starts from 60 seconds
  private countdownInterval: any;

  constructor(private autologoutService: AutologoutService) {
    this.autologoutService.resetIdleTimer();

  }

  @HostListener('document:keydown', ['$event'])
  onKeyPress(event: KeyboardEvent): void {
    console.log('Key press detected:', event);
    this.autologoutService.resetIdleTimer();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    console.log('Mouse move detected:', event);
    this.autologoutService.resetIdleTimer();
 }

  ngOnInit(): void {
    // Reset idle timer on app initialization
    this.autologoutService.resetIdleTimer();

    // Subscribe to the warning subject
    this.autologoutService.showWarningSubject.subscribe(show => {
      this.showWarning = show;
      if (show) {
        // Reset timer and start countdown when the pop-up is shown
        this.startCountdown();
      } else {
        this.clearCountdown();
      }
    });
  }

  // Start countdown timer
  startCountdown() {
    this.countdown = 60;  // Reset countdown to 60 seconds

    this.countdownInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.countdownInterval);
        this.autologoutService.logout();  // Log out the user after countdown ends
      }
    }, 1000);
  }

  // Clear countdown interval
  clearCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

 // Handle session extension (triggered by clicking "Stay Logged In")
 onExtendSession() {
  this.showWarning = false;  // Hide the warning popup
  this.clearCountdown();  // Clear the countdown
  this.autologoutService.extendSession();  // Extend the session (reset timers)
}

// Reset the idle timer when there is user activity
resetIdleTimer() {
  this.autologoutService.resetIdleTimer();
}
}
