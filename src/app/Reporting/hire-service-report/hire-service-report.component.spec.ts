import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireServiceReportComponent } from './hire-service-report.component';

describe('HireServiceReportComponent', () => {
  let component: HireServiceReportComponent;
  let fixture: ComponentFixture<HireServiceReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HireServiceReportComponent]
    });
    fixture = TestBed.createComponent(HireServiceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
