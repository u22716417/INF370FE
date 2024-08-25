import { Component, OnInit } from '@angular/core';
import { TicketService } from '../Services/ticket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems: any[] = [];
  total: number = 0;
  vat: number = 0;
  grandTotal: number = 0;

  constructor(private cartService: TicketService){}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotals();
  }

  calculateTotals(): void {
    let temptotal = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    this.vat = temptotal * 0.15;
    this.total = temptotal - this.vat; 
    this.grandTotal = this.total + this.vat;
  }
  


}
