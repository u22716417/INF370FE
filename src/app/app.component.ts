import { Component, HostListener, OnInit } from '@angular/core';
import { AutologoutService } from './UserSubsystem/autologout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showWarning = false;
  countdown = 20; // Countdown starts from 20 seconds
  private countdownInterval: any;

  constructor(private autologoutService: AutologoutService) {}

  ngOnInit(): void {
    this.autologoutService.resetIdleTimer(); // Initialize the idle timer

    // Subscribe to the warning subject to show the popup
    this.autologoutService.showWarningSubject.subscribe((show) => {
      this.showWarning = show;
      if (show) {
        this.startCountdown(); // Start the countdown when the popup shows
      } else {
        this.clearCountdown();
      }
    });
  }

  // Start countdown timer
  startCountdown() {
    this.countdown = 20; // Reset countdown to 20 seconds

    this.countdownInterval = setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.countdownInterval);
        this.autologoutService.logout(); // Log out the user after countdown ends
      }
    }, 1000);
  }

  // Clear countdown interval
  clearCountdown() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  // Extend the session when the user clicks "Stay Logged In"
  onExtendSession() {
    this.showWarning = false; // Hide the warning popup
    this.clearCountdown(); // Clear the countdown
    this.autologoutService.extendSession(); // Reset the idle timer and extend the session
  }

  // HostListener for user activity
  @HostListener('document:keydown')
  @HostListener('document:mousemove')
  resetIdleTimer() {
    this.autologoutService.resetIdleTimer(); // Reset the idle timer on user activity
  }
}
