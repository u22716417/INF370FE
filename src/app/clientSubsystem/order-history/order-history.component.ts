import { Component, OnInit } from '@angular/core';
import { TicketService } from '../Services/ticket.service';
import { UserManagementService } from 'src/app/AuthGuard/Authentication/UserManagementService';
import { Order } from './order-history';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orderHistory: Order[] = [];
  clientId: number | null = null;
  showNotification: boolean = false;
  notificationMessage: string = '';
  showHelpModal = false;  // State for displaying help modal

  constructor(private orderHistoryService: TicketService, private users: UserManagementService) { }

  ngOnInit(): void {
    const userId = this.users.getcurrentUserID();
    this.users.getClientId(userId).subscribe(
      (clientId: number) => {
        this.clientId = clientId;
    this.fetchOrderHistory();
      },
      (error) => {
        console.error('Error fetching client ID', error);
      }
    );
  }

  fetchOrderHistory(): void {
    if (this.clientId) {
      this.orderHistoryService.getOrderHistory(this.clientId).subscribe(
        (data: Order[]) => {
          console.log('Fetched Order History:', data); // Check if data has correct fields
          if (data && data.length > 0) {
            this.orderHistory = data; // Directly assign the fetched data
          } else {
            console.log('You have no orders');
            this.orderHistory = []; // Ensure the order history is empty
          }
        },
        (error) => {
          console.error('Error fetching order history', error);
        }
      );
    } else {
      console.error('Client ID is not available');
    }
  }
  
  

  getStars(rating: number | undefined): string[] {
    const stars = [];
    if (rating !== undefined) {
      for (let i = 0; i < 5; i++) {
        stars.push(i < rating ? '★' : '☆');
      }
    }
    return stars;
  }

  updateRating(order: any, newRating: number): void {
    order.rating = newRating;
    this.orderHistoryService.updateOrderRating(order.id, newRating).subscribe(
      () => {
        this.showPopupNotification('Rating updated successfully');
        console.log('Rating updated successfully');
       
      },
      (error) => {
        console.error('Error updating rating', error);
      }
    );
  }
  getRatingDescription(rating: number): string {
    switch (rating) {
      case 1: return 'Bad';
      case 2: return 'Poor';
      case 3: return 'Average';
      case 4: return 'Good';
      case 5: return 'Excellent';
      default: return 'No rating';
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

  // Method to open help modal
  openHelpModal() {
    this.showHelpModal = true;
  }

  // Method to close help modal
  closeHelpModal() {
    this.showHelpModal = false;
  }
}
