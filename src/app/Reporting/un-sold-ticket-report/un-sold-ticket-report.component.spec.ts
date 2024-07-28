import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnSoldTicketReportComponent } from './un-sold-ticket-report.component';

describe('UnSoldTicketReportComponent', () => {
  let component: UnSoldTicketReportComponent;
  let fixture: ComponentFixture<UnSoldTicketReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnSoldTicketReportComponent]
    });
    fixture = TestBed.createComponent(UnSoldTicketReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
