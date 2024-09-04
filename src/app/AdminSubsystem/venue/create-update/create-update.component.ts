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
    if (this.venue.venueName !== '' && this.venue.venueDescription !== '' && this.venue.venueCapacity && this.venue.venueContactPerson !== '' && this.venue.venueContactNumber) {
      if (this.venue.venueId === 0) {
        this.venueService.createVenue(this.venue).subscribe(
          (response) => {
            if (response != null) {
              alert('Venue has been added successfully');
              this.router.navigate(['/venues']);
            } else {
              alert('Failed to add venue');
            }
          },
          (error) => {
            console.error('Error adding venue:', error);
            alert('Failed to add venue. Please try again later.');
          }
        );
      } else {
        alert('Update failed');
      }
    } else {
      alert('Please fill all the fields');
    }
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
