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

  events: any[] = [];
  currentEvent: any;
  isModalVisible = false;
  isHelpModalVisible = false;
  helpContent: string = '';

  constructor(private eventService: TicketService, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(response => {
        this.events = [...response];
    });
  }

  addtoCart(Title: string, Price: number, id: number) {
    const newItem = new CartItem(id, Title, Price);
    this.eventService.addToCart(newItem);
    this.closeModal();
  }

  getbyID(id: number): void {
    this.eventService.getEventById(id).subscribe(
      response => {
        if (response) {
          this.currentEvent = response;
        } else {
          console.error('There are no upcoming events');
          this.currentEvent = null;  // Set to null if no event is found
        }
      },
      error => {
        console.error('Error fetching event:', error);
        console.error('Failed to load events. Please try again later');
        this.currentEvent = null;  
      }
    );
  }
  

  satinizaeImage(base64String: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64String);
  }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }

  openHelpModal() {
    this.isHelpModalVisible = true;
    this.helpContent = 'Here is some general help information for using this page. You can add events to your cart or view more details about each event by clicking the corresponding buttons.';
  }

  closeHelpModal() {
    this.isHelpModalVisible = false;
  }

  showHint(field: string) {
    this.isHelpModalVisible = true;
    switch (field) {
      case 'eventTitle':
        this.helpContent = 'The event title provides a brief name for the event. Clicking "Add To Cart" will add this event to your shopping cart.';
        break;
      // Add more cases as needed for other fields
      default:
        this.helpContent = 'No specific help available for this field.';
    }
  }
}
