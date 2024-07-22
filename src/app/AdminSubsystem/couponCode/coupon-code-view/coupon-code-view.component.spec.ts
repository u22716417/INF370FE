import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponCodeViewComponent } from './coupon-code-view.component';

describe('CouponCodeViewComponent', () => {
  let component: CouponCodeViewComponent;
  let fixture: ComponentFixture<CouponCodeViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CouponCodeViewComponent]
    });
    fixture = TestBed.createComponent(CouponCodeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
