import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CouponCode } from '../couponCode';
import { CodeServiceService } from '../service/code-service.service';

@Component({
  selector: 'app-coupon-code-view',
  templateUrl: './coupon-code-view.component.html',
  styleUrls: ['./coupon-code-view.component.scss']
  
})
export class CouponCodeViewComponent implements OnInit {
  errorMessage: string = '';
  newCouponCode: CouponCode = { 
    couponCodeId: 0,
    code: '', 
    couponCodeDescription: '',
    discountAmount: 0,
    sponsorId: 0
    
    
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private codeService: CodeServiceService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.getCouponCodeById(id);
    });
  }

  getCouponCodeById(id: number): void {
    this.codeService.getCodeById(id).subscribe(
      code => {
        if (code) {
          this.newCouponCode = code;
        } else {
          this.errorMessage = 'Coupon code details not found.';
        }
      },
      error => {
        this.errorMessage = 'Error fetching coupon code details.';
        console.error('Error fetching coupon code details', error);
      }
    );
  }

  close(): void {
    this.router.navigate(['/codes-list']);
  }
}
