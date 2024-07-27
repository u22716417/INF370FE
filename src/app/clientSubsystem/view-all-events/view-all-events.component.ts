import { Component, OnInit } from '@angular/core';
import { TicketService } from '../Services/ticket.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-all-events',
  templateUrl: './view-all-events.component.html',
  styleUrls: ['./view-all-events.component.scss']
})
export class ViewAllEventsComponent implements OnInit {

 
  constructor(private eventService: TicketService, private sanitizer: DomSanitizer) {
    
  }
 

  events : any[] = [];


  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(response=>{
        console.log(response);
        this.events = [...response]
    });
  }
  
  isModalVisible = false;

  satinizaeImage(base64String: string)
  {
      return this.sanitizer.bypassSecurityTrustResourceUrl(base64String);
  }
  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

}
