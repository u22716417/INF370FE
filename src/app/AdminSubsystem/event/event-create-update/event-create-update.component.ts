import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EventServiceService } from '../service/event-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-event-create-update',
  templateUrl: './event-create-update.component.html',
  styleUrls: ['./event-create-update.component.css']
})
export class EventCreateUpdateComponent implements OnInit {

  showNotification: boolean = false;
  notificationMessage: string = '';
  errorMessage: string = '';
  imagePreview: null | undefined;
  showPopup: boolean = false;
  profileImage: string | ArrayBuffer | null = null;
  profileImagePreview: string | ArrayBuffer | null = null;
  isSubmitted: boolean = false;
  heading: string = '';
  venues: any[] = [];
  newEvent: any = {
    id: 0,
    title: '',
    description: '',
    eventType: '',
    eventRemainingTickets: 0,
    eventAddress: '',
    image: '',
    eventDate: '',
    eventTime: '',
    venueId: 0,
    eventPrice: 0,
    ticketPriceId: 0,
    ticketTypeId: 0
  };
  fileNameUploaded: any;
  imageInputTouched: boolean = false;
  imageInputInvalid: boolean = false;
  selectedFile: File | null = null;
  showHelpModal = false;  // State for displaying help modal

  constructor(public router: Router, private eventService: EventServiceService, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.getVenues(); // Fetch the list of venues
  
    this.route.params.subscribe(params => {
      const id = parseInt(params['id'], 10); 
      
      if (id > 0) {
        this.heading = 'Edit Event';
        this.eventService.getEventById(id).subscribe((response: any) => {
          this.newEvent = response;
          
          // Ensure these functions are returning correctly formatted values
          this.newEvent.eventDate = this.formatDateToISO(this.newEvent.eventDate);
          this.newEvent.eventTime = this.formatTimeToISO(this.newEvent.eventTime);
          
          // Set the image preview if the image exists
          if (this.newEvent.image) {
            this.profileImagePreview = this.newEvent.image; 
          }
        }, error => {
          console.error('Error fetching event:', error); // Add error handling
        });
      } else {
        this.heading = 'Add Event';
      }
    });
  }
  


  addEvent(eventForm: NgForm) {
    if (this.newEvent.id === 0) {
      this.eventService.createEvent(this.newEvent).subscribe((response: any) => {
        this.handleNavigation(response);
        this.showPopupNotification('Event successfully created!');
      }, error => {
        console.error('Error creating event:', error);
        this.showPopupNotification('Error creating event. Please try again.');

      });
    } else {
      this.eventService.updateEvent(this.newEvent, this.newEvent.id).subscribe((response: any) => {
        this.handleNavigation(response);
        this.showPopupNotification('Event successfully updated!');
      }, error => {
        console.error('Error updating event:', error);
        this.errorMessage = 'Error updating event. Please try again.'; // Set an error message
        this.showPopupNotification('Error updating event. Please try again.');
      });
    }
  }
  
  private handleNavigation(response: any) {
    if (response != null) {
      this.router.navigate(['/component/events']);
    } else {
      alert('An error occurred. Please try again.');
    }
  }

  private formatDateToISO(date: any): string {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  }

  private formatTimeToISO(time: any): string {
    return time ? time.split(':').length === 2 ? `${time}:00` : time : '';
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.newEvent.image = reader.result as string; // Convert file to Base64 string
        this.profileImagePreview = this.newEvent.image; // Optional: preview the image
      };
      reader.readAsDataURL(file);
    }
  }

  getVenues() {
    this.http.get<any[]>('https://localhost:7149/api/Venues')
      .subscribe(data => {
        this.venues = data;
  
        // Pre-select the venue in edit mode
        if (this.newEvent.venueId && this.venues.length > 0) {
          this.newEvent.venueId = this.newEvent.venueId;  // Ensure it's set to the right value
        }
      }, error => {
        console.error('Error loading venues:', error);
      });
  }
  

  cancel() {
    this.router.navigate(['/component/events']);
  }

  showPopupNotification(message: string): void {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
      this.notificationMessage = '';
    }, 3000);
  }

  onPriceChange() {
    if (this.newEvent.eventPrice < 0) {
      this.newEvent.eventPrice = 0;
    }
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
