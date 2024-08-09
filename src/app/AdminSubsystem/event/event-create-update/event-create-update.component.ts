import { Component, OnInit } from '@angular/core';
import { Event } from '../eventClass';
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



  errorMessage: string = '';
  imagePreview: null | undefined;
  showPopup: boolean = false; // Add a flag for the popup
  profileImage: string | ArrayBuffer | null = null;
  profileImagePreview: string | ArrayBuffer | null = null;
  formData = new FormData();
  isSubmitted: boolean = false;
  heading: string = '';
  venues: any[] = []; // Array to store the venues
  newEvent: any = {
    id: 0, // Ensure this is initialized, 0 means a new event
    title: '',
    description: '',
    eventType: '',
    eventRemainingTickets: 0,
    eventAddress: '',
    image: '',
    eventDate: '',
    eventTime: '',
    venueId: 0,
    ticketPrice: 0
  };


  constructor(public router: Router, private eventService: EventServiceService, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.getVenues(); // Fetch the list of venues

    this.route.params.subscribe(params => {
      const id = parseInt(params['Id']);

      if (id > 0) {
        this.heading = 'Edit Event';
        this.eventService.getEventById(id).subscribe((response: any) => {
          this.newEvent = response;
          this.newEvent.eventDate = this.formatDateToISO(this.newEvent.eventDate);
          this.newEvent.eventTime = this.formatTimeToISO(this.newEvent.eventTime);
     
        });
      } else {
        this.heading = 'Add Event';
      }
    });
  }

  addEvent(eventForm: NgForm) {
    console.log(this.newEvent);
    console.log('Selected Venue ID:', this.newEvent.venueId); 
    if (eventForm.valid) {
      if (this.newEvent.id === 0) {
        this.eventService.createEvent(this.newEvent).subscribe((response: any) => {
          this.handleNavigation(response);
        }, error => {
          console.error('Error creating event:', error);
          console.log('Event Payload:', this.newEvent);
        });
      } else {
        this.eventService.updateEvent(this.newEvent).subscribe((response: any) => {
          this.handleNavigation(response);
        }, error => {
          console.error('Error updating event:', error);
        });
      }
    } else {
      alert('Please fill all the fields');
    }
  }

  private handleNavigation(response: any) {
    if (response != null) {
      this.router.navigate(['/events']);
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

    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      this.errorMessage = 'Please select a valid image file.';
      this.imagePreview = null;
      return;
    }

    // Check if the file size is less than 2MB
    if (file.size > 2 * 1024 * 1024) {
      this.errorMessage = 'The file size must be less than 2MB.';
      this.imagePreview = null;
      return;
    }


    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
        this.profileImagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  getVenues() {
    this.http.get<any[]>('http://localhost:5196/api/Venues') // Replace with your API URL
      .subscribe(data => {
        this.venues = data;
      }, error => {
        console.error('Error fetching venues:', error);
      });
  }

  cancel() {
    this.router.navigate(['/component/events-list']);
  }
}
