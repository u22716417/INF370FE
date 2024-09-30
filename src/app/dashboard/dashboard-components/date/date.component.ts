import { Component } from '@angular/core';
import { an } from '@fullcalendar/core/internal-common';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.css']
})
export class DateComponent {

  currentDate: Date = new Date();
  day: string = '';
  date: number = 0;
  month: string = '';
  currentUser: any;

  ngOnInit(): void {
    this.updateCalendar();
  }

  updateCalendar(): void {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    this.day = days[this.currentDate.getDay()];
    this.date = this.currentDate.getDate();
    this.month = months[this.currentDate.getMonth()];
  }
}
