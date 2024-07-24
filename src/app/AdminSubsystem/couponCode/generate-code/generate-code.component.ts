import { Component } from '@angular/core';
import { CodeServiceService } from '../service/code-service.service';
import { Router } from '@angular/router';

export interface CouponCode {
  couponCodeId: number;
  code: string;
  couponCodeDescription: string;
  discountAmount: number;
  sponsorEmail: string;
}

@Component({
  selector: 'app-generate-code',
  templateUrl: './generate-code.component.html',
  styleUrls: ['./generate-code.component.css']
})
export class GenerateCodeComponent {

  description: string = '';
  discountAmount: number = 0;
  sponsorEmail: string = '';
  generatedCouponCode: CouponCode | null = null;

  constructor(private couponCodeService: CodeServiceService, public router: Router) {}

  onSubmit() {
    console.log('Form submitted');

    const newCouponCode = {
      description: this.description,
      discountAmount: this.discountAmount,
      sponsorEmail: this.sponsorEmail
    };

    this.couponCodeService.generateCouponCode(newCouponCode).subscribe(
      (response) => {
        this.generatedCouponCode = response;
        this.description = '';
        this.discountAmount = 0;
        this.sponsorEmail = '';
        console.log('Coupon code generated:', response);

        // Redirect to the codes list page
        this.router.navigate(['/component/codes-list']);
      },
      (error) => {
        console.error('Error generating coupon code', error);
      }
    );
  }
}
