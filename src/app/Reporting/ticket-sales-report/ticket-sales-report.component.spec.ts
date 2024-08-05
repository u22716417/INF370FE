import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketSalesReportComponent } from './ticket-sales-report.component';

describe('TicketSalesReportComponent', () => {
  let component: TicketSalesReportComponent;
  let fixture: ComponentFixture<TicketSalesReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TicketSalesReportComponent]
    });
    fixture = TestBed.createComponent(TicketSalesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
