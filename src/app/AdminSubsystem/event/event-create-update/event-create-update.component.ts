import { Component, OnInit } from '@angular/core';
import { Event } from '../eventClass';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { EventServiceService } from '../service/event-service.service';

@Component({
  selector: 'app-event-create-update',
  templateUrl: './event-create-update.component.html',
  styleUrls: ['./event-create-update.component.css']
})
export class EventCreateUpdateComponent implements OnInit {

  newEvent: Event = { 
    eventId: 0, 
    eventName: '', 
    eventDate: '', 
    eventTime: '', 
    eventDescription: '', 
    eventType: '', 
    eventLocation: '', 
    attendances: [], 
    eventWorkers: [] 
  };

  fileNameUploaded = '';
  formData = new FormData();
  
  isSubmitted: boolean = false;
  heading: string = '';

  constructor(public router: Router, private eventService: EventServiceService, private route: ActivatedRoute) { }

  cancel() {
    this.router.navigate(['/events']);
  }

  ngOnInit(): void {
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
    if (eventForm.valid) {
      if (this.newEvent.eventId === 0) {
        this.eventService.createEvent(this.newEvent).subscribe((response: any) => {
          if (response != null) {
            this.router.navigate(['/events']);
          } else {
            this.router.navigate(['/events']);
          }
        });
      } else {
        this.eventService.updateEvent(this.newEvent).subscribe((response: any) => {
          if (response != null) {
            this.router.navigate(['/events']);
          } else {
            this.router.navigate(['/events']);
          }
        });
      }
    } else {
      alert('Please fill all the fields');
    }
  }

  private formatDateToISO(date: any): string {
    return date ? new Date(date).toISOString().split('T')[0] : '';
  }

  private formatTimeToISO(time: any): string {
    return time ? new Date(`1970-01-01T${time}Z`).toISOString().split('T')[1].split('Z')[0] : '';
  }

  uploadFile = (files: any) => {
    let fileToUpload = <File>files[0];
    this.formData.append('file', fileToUpload, fileToUpload.name);
    this.fileNameUploaded = fileToUpload.name
  }
}
