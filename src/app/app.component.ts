import { Component, OnInit } from '@angular/core';
import { AutologoutService } from './UserSubsystem/autologout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private autologoutService: AutologoutService) {}

  ngOnInit(): void {
    this.autologoutService.resetIdleTimer();  // Initialize idle timer
  }
  title = 'app';
}
