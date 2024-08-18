import { Component, OnInit } from '@angular/core';
import { Event } from '../eventClass'; // Adjust the path as necessary
import { EventServiceService } from '../service/event-service.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventServiceService) { }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe(events => {
      console.log(events)
      this.events = events});
    
  }

  deleteEvent(eventId: number): void {
    this.eventService.deleteEvent(eventId).subscribe(() => {
      this.events = this.events.filter(event => event.eventId !== eventId);
    });
  }

  exportToJson(): void {
    const dataStr = JSON.stringify(this.events, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileName = 'events.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileName);
    linkElement.click();
  }
}
