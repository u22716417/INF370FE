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

  constructor(private couponCodeService: CodeServiceService, public router: Router) {}

  ngOnInit(): void {
    this.couponCodeService.getSponsors().subscribe(
      (response) => {
        this.sponsors = response;
      },
      (error) => {
        console.error('Error fetching sponsors:', error);
      }
    );
  }

  onSubmit() {
    if (this.sponsorId === null) {
      alert('Please select a sponsor.');
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
        this.description = '';
        this.discountAmount = 0;
        this.sponsorId = null;
        console.log('Coupon code generated:', response);

        // Redirect to the codes list page
        this.router.navigate(['/component/codes-list']);
      },
      (error) => {
        console.error('Error generating coupon code', error);
      }
    );
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
