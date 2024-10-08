import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../Services/ticket.service';
import { UserManagementService } from 'src/app/AuthGuard/Authentication/UserManagementService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payfast',
  templateUrl: './payfast.component.html',
  styleUrls: ['./payfast.component.css']
})
export class PayFastComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  vat: number = 0;
  grandTotal: number = 0;
  discountAmount: number = 0;
  paymentForm: FormGroup;
  showOverlay: boolean = false;
  showNotification: boolean = false;
  notificationMessage: string = '';

  constructor(
    private cartService: TicketService,
    private fb: FormBuilder,
    private user: UserManagementService,
    private route: Router
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expiryDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/([0-9]{2})$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
    });
  }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotals();
  }

  calculateTotals(): void {
    let temptotal = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    this.vat = temptotal * 0.15;
    this.total = temptotal - this.vat;

    // Retrieve discount from session storage
    const storedDiscount = sessionStorage.getItem('discountAmount');
    this.discountAmount = storedDiscount ? +storedDiscount : 0; // Convert to number if exists
    this.grandTotal = (this.total + this.vat) - this.discountAmount;
  }

  processPayment(): void {
    if (this.paymentForm.valid) {
      this.showOverlay = true;

      const paymentRequest = {
        userId: this.user.getcurrentUserID(),
        cartItems: this.cartItems
      };

      this.cartService.processPayment(paymentRequest).subscribe(
        response => {
          this.showOverlay = false;
          this.showPopupNotification('Payment processed successfully! Please check your Email');
          this.cartService.resetCart();
          sessionStorage.removeItem('discountAmount'); // Clear discount from session storage
          this.route.navigate(['/component/orderHistory']);
        },
        error => {
          this.showOverlay = false;
          this.showPopupNotification('Payment failed. Please try again.');
        }
      );
    } else {
      this.showPopupNotification('Please fill in all fields correctly.');
    }
  }

  cancelPayment() {
    // Clear the discount when canceling payment
    sessionStorage.removeItem('discountAmount'); 
    window.history.back(); // Redirect to checkout or cart page
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
