import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DispenseHireItemsComponent } from './dispense-hire-items.component';

describe('DispenseHireItemsComponent', () => {
  let component: DispenseHireItemsComponent;
  let fixture: ComponentFixture<DispenseHireItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DispenseHireItemsComponent]
    });
    fixture = TestBed.createComponent(DispenseHireItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
