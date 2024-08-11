import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventAttendanceReportComponent } from './event-attendance-report.component';

describe('EventAttendanceReportComponent', () => {
  let component: EventAttendanceReportComponent;
  let fixture: ComponentFixture<EventAttendanceReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventAttendanceReportComponent]
    });
    fixture = TestBed.createComponent(EventAttendanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
