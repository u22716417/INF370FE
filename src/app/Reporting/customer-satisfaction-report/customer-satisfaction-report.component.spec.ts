import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSatisfactionReportComponent } from './customer-satisfaction-report.component';

describe('CustomerSatisfactionReportComponent', () => {
  let component: CustomerSatisfactionReportComponent;
  let fixture: ComponentFixture<CustomerSatisfactionReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerSatisfactionReportComponent]
    });
    fixture = TestBed.createComponent(CustomerSatisfactionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
