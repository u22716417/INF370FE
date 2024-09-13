import { Component } from '@angular/core';
import {EventEmitter, Output,OnInit } from '@angular/core';


@Component({
  selector: 'app-logout-warning',
  templateUrl: './logout-warning.component.html',
  styleUrls: ['./logout-warning.component.css']
})
export class LogoutWarningComponent {
  @Output() extendSession = new EventEmitter<void>();
  countdown: number = 60;  // 60 seconds countdown
  private interval: any;

  ngOnInit() {
    this.startCountdown();
  }

  startCountdown() {
    this.interval= setInterval(() => {
      if (this.countdown > 0) {
        this.countdown--;
      } else {
        clearInterval(this.interval);
        // Emit event when countdown is complete
        this.extendSession.emit();
      }
    }, 1000);
  }

  onExtendSession() {
    clearInterval(this.interval);  // Clear the countdown interval when the session is extended
    this.extendSession.emit();  // Notify parent to extend session
  }

}
