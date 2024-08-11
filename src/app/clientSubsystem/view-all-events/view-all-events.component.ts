import { Component, OnInit } from '@angular/core';
import { TicketService } from '../Services/ticket.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CartItem } from '../CartItem';

@Component({
  selector: 'app-view-all-events',
  templateUrl: './view-all-events.component.html',
  styleUrls: ['./view-all-events.component.scss']
})
export class ViewAllEventsComponent implements OnInit {

 
  constructor(private eventService: TicketService, private sanitizer: DomSanitizer) {
    
  }
 

  events : any[] = [];
  currentEvent: any;

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(response=>{
        console.log(response);
        this.events = [...response]
    });
  }

 
  addtoCart(Title:string, Price: number, id: number)
  {
    const newItem = new CartItem(id, Title, Price);

    this.eventService.addToCart(newItem);
    this.closeModal();
  }

  getbyID(id: number)
  {
      this.eventService.getEventById(id).subscribe(response=>{
         this.currentEvent = response;
         console.log(this.currentEvent);
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
