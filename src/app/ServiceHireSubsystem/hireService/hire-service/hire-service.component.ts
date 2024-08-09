// hire-service.component.ts
import { Component } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { CalendarOptions } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction'; // Import interactionPlugin
@Component({
  selector: 'app-hire-service',
  templateUrl: './hire-service.component.html',
  styleUrls: ['./hire-service.component.scss']
})
export class HireServiceComponent {
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    events: [
      { title: 'event 1', date: '2024-08-01' },
      { title: 'event 2', date: '2024-08-02' }
    ],
    dateClick: this.handleDateClick.bind(this) // Bind the method to the component instance
  };

  showPopup = false;
  popupDate = '';

  handleDateClick(arg: any) {
    this.popupDate = `Date clicked: ${arg.dateStr}`;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
}
