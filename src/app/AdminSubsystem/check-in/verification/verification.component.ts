import { Component, Input } from '@angular/core';
import { Attendee } from '../classes/attendee';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent {
  @Input() attendee: Attendee | null = null;
  date: Date = new Date();

  get hasAttendee(): boolean {
    return this.attendee !== null;
  }

  constructor(public datePipe: DatePipe){
    
  }
}
