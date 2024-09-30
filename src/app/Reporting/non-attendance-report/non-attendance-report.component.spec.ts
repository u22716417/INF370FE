import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NonAttendanceReportComponent } from './non-attendance-report.component';

describe('NonAttendanceReportComponent', () => {
  let component: NonAttendanceReportComponent;
  let fixture: ComponentFixture<NonAttendanceReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NonAttendanceReportComponent]
    });
    fixture = TestBed.createComponent(NonAttendanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
