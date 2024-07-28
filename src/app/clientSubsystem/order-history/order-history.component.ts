import { Component, OnInit } from '@angular/core';
import { TicketService } from '../Services/ticket.service';
import { UserManagementService } from 'src/app/AuthGuard/Authentication/UserManagementService';


@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orderHistory: any[] = [];
  clientId = 1; // Set this to the actual client ID

  constructor(private orderHistoryService: TicketService, private users: UserManagementService) { }

  ngOnInit(): void {
    this.fetchOrderHistory();
    this.clientId = this.users.getcurrentUserID();
  }

  fetchOrderHistory(): void {
    this.orderHistoryService.getOrderHistory(this.clientId).subscribe(
      (data: any[]) => {
        this.orderHistory = data;
      },
      (error) => {
        console.error('Error fetching order history', error);
      }
    );
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
        console.log('Rating updated successfully');
      },
      (error) => {
        console.error('Error updating rating', error);
      }
    );
  }
}
