import { Component, Input } from '@angular/core';
import { Attendee } from '../classes/attendee';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent {
  @Input() attendee: Attendee | null = null;

  constructor(){
    
  }
}
