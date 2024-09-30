import { Component, OnInit } from '@angular/core';
import { CodeServiceService } from '../service/code-service.service';
import { Router } from '@angular/router';

export interface CouponCode {
  couponCodeId: number;
  code: string;
  couponCodeDescription: string;
  discountAmount: number;
}

@Component({
  selector: 'app-generate-code',
  templateUrl: './generate-code.component.html',
  styleUrls: ['./generate-code.component.css']
})
export class GenerateCodeComponent implements OnInit {
  description: string = '';
  discountAmount: number = 0;
  sponsorId: number | null = null;
  generatedCouponCode: CouponCode | null = null;
  sponsors: any[] = [];
  showHelpModal = false;  // State for displaying help modal
  showNotification: boolean = false;
  notificationMessage: string = '';

  constructor(private couponCodeService: CodeServiceService, public router: Router) {}

  ngOnInit(): void {
    this.fetchSponsors();
  }

  fetchSponsors(): void {
    this.couponCodeService.getSponsors().subscribe(
      (response) => {
        this.sponsors = response;
      },
      (error) => {
        this.showPopupNotification('Error fetching sponsors: ' + error.message);
        console.error('Error fetching sponsors:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.sponsorId === null) {
      this.showPopupNotification('Please select a sponsor.');
      return;
    }

    const newCouponCode = {
      description: this.description,
      discountAmount: this.discountAmount,
      sponsorId: this.sponsorId
    };

    this.couponCodeService.generateCouponCode(newCouponCode).subscribe(
      (response) => {
        this.generatedCouponCode = response;
        this.showPopupNotification('Coupon code generated successfully!');
        console.log('Coupon code generated:', response);

        // Redirect to the codes list page
        this.router.navigate(['/component/codes-list']);
      },
      (error) => {
        this.showPopupNotification('Error generating coupon code: ' + error.message);
        console.error('Error generating coupon code', error);
      }
    );
  }

  resetForm(): void {
    this.description = '';
    this.discountAmount = 0;
    this.sponsorId = null;
  }

  // Method to open help modal
  openHelpModal(): void {
    this.showHelpModal = true;
  }

  // Method to close help modal
  closeHelpModal(): void {
    this.showHelpModal = false;
  }

  showPopupNotification(message: string): void {
    this.notificationMessage = message;
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
      this.notificationMessage = ''; // Clear the message after the notification disappears
    }, 3000);
  }
}
