import { Component, OnInit } from '@angular/core';
import { Event } from '../eventClass'; // Adjust the path as necessary
import { EventServiceService } from '../service/event-service.service';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  dtOptions: Config = {};
  showHelpModal = false;  // State for displaying help modal

  constructor(private eventService: EventServiceService) { }


  ngOnInit(): void {

  

    this.getEvents();
  }

  getEvents(): void {
    this.eventService.getEvents().subscribe(
      (events) => {
        console.log(events);
        this.events = events;
      },
      (error) => {
        console.error('Error fetching events:', error);
        alert('There are no upcoming events.');
      }
    );
  
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
  }
  

  deleteEvent(eventId: number): void {
    this.eventService.deleteEvent(eventId).subscribe(
      () => {
        this.events = this.events.filter(event => event.eventId !== eventId);
        alert('Event has been removed successfully');
      },
      (error) => {
        console.error('Error deleting event:', error);
        alert('Failed to remove event. Please try again later.');
      }
    );
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

  // Method to open help modal
openHelpModal() {
  this.showHelpModal = true;
}

// Method to close help modal
closeHelpModal() {
  this.showHelpModal = false;
}
}
