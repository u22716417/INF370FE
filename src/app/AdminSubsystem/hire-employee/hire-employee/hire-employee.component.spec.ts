import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireEmployeeComponent } from './hire-employee.component';

describe('HireEmployeeComponent', () => {
  let component: HireEmployeeComponent;
  let fixture: ComponentFixture<HireEmployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HireEmployeeComponent]
    });
    fixture = TestBed.createComponent(HireEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
