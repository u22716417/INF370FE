import { Component, OnInit } from '@angular/core';
import { Venue } from '../venue';
import { VenueService } from '../service/venue-service.service';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css']
})
export class CreateUpdateComponent implements OnInit{

  venue: Venue = {venueId: 0, venueName: '', venueAddress: '', venueCapacity: 0, venueDescription: '', venueContactPerson: '', venueContactNumber: ''}
  
  isSubmitted:boolean = false;

  heading: string = '';
  showNotification: boolean = false;
  notificationMessage: string = '';
  showHelpModal = false;  // State for displaying help modal

  


  constructor(public router: Router, private venueService:VenueService, private route: ActivatedRoute){}

  cancel() {
    console.log('Cancel button clicked');
    this.router.navigate(['/component/venues']);
  }

  ngOnInit(): void {
    this.venue = { venueId: 0, venueName: '',venueAddress: '', venueCapacity: 0, venueDescription: '', venueContactPerson: '', venueContactNumber: ''};
    this.route.params.subscribe(params =>{
      const id = parseInt(params['Id']);

      if(id > 0) 
      {

        this.heading = 'Edit Venue';
        this.venueService.getVenueById(id)
        .subscribe(response => this.venue = response)
      }
      else
      {
        this.heading = 'Add Venue'
      }
    
  })
  }

  addVenue(venueForm: NgForm): void {
    if (this.isFormValid()) {
      // For creating a new venue
      if (this.venue.venueId === 0) {
        this.venueService.createVenue(this.venue).subscribe(
          (response) => {
            if (response != null) {
              this.showPopupNotification('Venue has been added successfully');
              this.router.navigate(['/component/venues']);
            } else {
              this.showPopupNotification('Failed to add venue');
            }
          },
          (error) => {
            console.error('Error adding venue:', error);
            this.showPopupNotification('Failed to add venue. Please try again later.');
          }
        );
      } else {
        this.showPopupNotification('Update failed');
      }
    } else {
      this.showPopupNotification('Please fill all the fields');
    }
  }
  
  // Check if all required fields are filled
  isFormValid(): boolean {
    return (
      this.venue.venueName !== '' &&
      this.venue.venueDescription !== '' &&
      this.venue.venueCapacity > 0 &&
      this.venue.venueContactPerson !== '' &&
      this.venue.venueContactNumber !== ''
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

  // Method to open help modal
  openHelpModal() {
    this.showHelpModal = true;
  }

  // Method to close help modal
  closeHelpModal() {
    this.showHelpModal = false;
  }
  
}
