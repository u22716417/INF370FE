import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAttendanceReportComponent } from './sales-attendance-report.component';

describe('SalesAttendanceReportComponent', () => {
  let component: SalesAttendanceReportComponent;
  let fixture: ComponentFixture<SalesAttendanceReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesAttendanceReportComponent]
    });
    fixture = TestBed.createComponent(SalesAttendanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
