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

  


  constructor(private router: Router, private venueService:VenueService, private route: ActivatedRoute){}

  cancel() {
    this.router.navigate(['/venues']);

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

  addVenue(venueForm:NgForm){
    if (this.venue.venueName != '' && this.venue.venueDescription != '' && this.venue.venueCapacity && this.venue.venueContactPerson != ''&& this.venue.venueContactNumber)
    {
      if (this.venue.venueId === 0)
        {
          this.venueService.createVenue(this.venue)
          .subscribe(response => {
            if(response != null)
              {
                this.router.navigate(['/venues']);
              }
              else
              {
                alert('Create failed');
              }
        })
        }
        else
        {
          alert('Update failed');
        }
    }
    else
      {
       alert('Please fill all the fields');
      }
  }

  
  
}
