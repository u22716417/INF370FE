import { Component } from '@angular/core';
import { CodeServiceService } from '../service/code-service.service';

@Component({
  selector: 'app-generate-code',
  templateUrl: './generate-code.component.html',
  styleUrl: './generate-code.component.css'
})
export class GenerateCodeComponent {

  description: string = '';
  discountAmount: number = 0;
  generatedCouponCode: any;

  constructor(private couponCodeService: CodeServiceService) {}

  onSubmit(): void {
    this.couponCodeService.generateCouponCode(this.description, this.discountAmount).subscribe(
      couponCode => {this.generatedCouponCode = couponCode
      console.log(couponCode)
      
  });
  }
}
