import { Component, OnInit } from '@angular/core';
import { Venue } from '../venue';
import { VenueService } from '../service/venue-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css']
})
export class CreateUpdateComponent implements OnInit {

  venue: Venue = {
    venueId: 0,
    venueName: '',
    venueAddress: '',
    venueCapacity: 0,
    venueDescription: '',
    contactPerson: '',
    venueContactNumber: ''
  };

  isSubmitted: boolean = false;
  heading: string = '';
  showNotification: boolean = false;
  notificationMessage: string = '';
  showHelpModal = false;  // State for displaying help modal

  constructor(
    public router: Router,
    private venueService: VenueService,
    private route: ActivatedRoute
  ) { }

  cancel() {
    console.log('Cancel button clicked');
    this.router.navigate(['/component/venues']);
  }

  ngOnInit(): void {
    this.venue = {
      venueId: 0,
      venueName: '',
      venueAddress: '',
      venueCapacity: 0,
      venueDescription: '',
      contactPerson: '',
      venueContactNumber: ''
    };

    this.route.params.subscribe(params => {
      const id = parseInt(params['id']);

      if (id > 0) {
        // Edit mode
        this.heading = 'Edit Venue';
        this.venueService.getVenueById(id).subscribe(response => {
          this.venue = response;
        });
      } else {
        // Add mode
        this.heading = 'Add Venue';
      }
    });
  }

  addVenue(venueForm: NgForm): void {
    console.log(this.venue);  // Check what values are populated
  
    if (this.isFormValid()) {
      if (this.venue.venueId === 0) {
        this.venueService.createVenue(this.venue).subscribe(
          (response) => {
            if (response != null) {
              this.showPopupNotification('Venue has been added successfully');
              this.router.navigate(['/component/venue']);
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
        this.venueService.updateVenue(this.venue).subscribe(
          (response) => {
            this.showPopupNotification('Venue has been updated successfully');
            this.router.navigate(['/component/venue']);
          },
          (error) => {
            console.error('Error updating venue:', error);
            this.showPopupNotification('Failed to update venue. Please try again later.');
          }
        );
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
      this.venue.contactPerson !== '' &&
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
