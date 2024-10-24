import { Component, OnInit } from '@angular/core';
import { TicketService } from '../Services/ticket.service';
import { CodeServiceService } from 'src/app/AdminSubsystem/couponCode/service/code-service.service';
import { CouponCode } from 'src/app/AdminSubsystem/couponCode/couponCode';

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
  discountAmount: number = 0;
  couponCode: string = '';
  errorMessage: string = '';

  constructor(
    private cartService: TicketService,
    private codeService: CodeServiceService // Inject the CodeServiceService
  ) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
    this.calculateTotals();

    // Retrieve discount from session storage if available
    const storedDiscount = sessionStorage.getItem('discountAmount');
    if (storedDiscount) {
      this.discountAmount = +storedDiscount; // Convert to number
      this.calculateTotals();
    }
  }

  calculateTotals(): void {
    let temptotal = this.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    this.vat = temptotal * 0.15;
    this.total = temptotal - this.vat; 
    this.grandTotal = (this.total + this.vat) - this.discountAmount;
  }

  applyCoupon(): void {
    if (this.couponCode.trim() === '') {
      this.errorMessage = 'Please enter a coupon code.';
      return;
    }
    
    // Validate the coupon code using CodeServiceService
    this.codeService.getAllCodes().subscribe((codes: CouponCode[]) => {
      const validCoupon = codes.find(code => code.code === this.couponCode);

      if (validCoupon) {
        this.discountAmount = validCoupon.discountAmount;
        sessionStorage.setItem('discountAmount', this.discountAmount.toString()); // Store in session storage
        this.errorMessage = '';
        this.calculateTotals(); // Recalculate totals with discount
      } else {
        this.errorMessage = 'Invalid coupon code. Please try again.';
      }
    }, error => {
      this.errorMessage = 'Error validating coupon code. Please try again later.';
    });
  }

  clearDiscount(): void {
    this.discountAmount = 0; // Reset discount amount
    sessionStorage.removeItem('discountAmount'); // Clear from session storage
  }
}
