import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Event } from '../eventClass'; // Adjust the path as necessary
import { EventServiceService } from '../service/event-service.service';
import { Config } from 'datatables.net';
@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  errorMessage: string | null = null;
  isLoading = false;
  showNotification: boolean = false;
  notificationMessage: string = '';
  events: Event[] = [];
  dtOptions: Config = {};
  showHelpModal = false;  // State for displaying help modal
  @ViewChild('fileInput') fileInput!: ElementRef;
  
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

loadEvents(): void {
  this.eventService.getEvents().subscribe(
    (data: Event[]) => {
      this.events = data;
    },
    (error) => {
      console.error('Error loading events:', error);
      this.showPopupNotification('Failed to load events. Please try again later.');
    }
  );
}

onFileSelected(event: any): void {
  const file = event.target.files[0];
  console.log(file);  // Check if the file is correctly detected

  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        console.log('File content:', jsonData);  // Check file content
        this.saveImportedEvents(jsonData);  // Save the parsed data
      } catch (error) {
        alert('Invalid JSON file');
        console.error('Error parsing JSON:', error);
      }
    };
    reader.readAsText(file);  // Read the file as text
  } else {
    console.log('No file selected');
  }
}

// Trigger file input click
importEvents(): void {
  console.log('Import button clicked');
  this.fileInput.nativeElement.click();  // Trigger the file input click programmatically
}

// Save sponsors via the backend service
saveImportedEvents(events: Event[]): void {
  console.log('Sending data to the backend:', events);  // Log the data sent to the backend
  this.eventService.importEvnts(events).subscribe(
    () => {
      this.loadEvents();  // Reload the sponsor list after successful import
      this.showPopupNotification('Events imported successfully');
      console.log('Import successful');
    },
    (error) => {
      console.error('Error importing events:', error);
      this.showPopupNotification('Failed to import events. Please try again.');
    }
  );
}

showPopupNotification(message: string): void {
  this.notificationMessage = message;
  this.showNotification = true;
  setTimeout(() => {
    this.showNotification = false;
    this.notificationMessage = '';
  }, 3000);
}


}
