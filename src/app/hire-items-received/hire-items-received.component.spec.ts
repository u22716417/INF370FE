import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireItemsReceivedComponent } from './hire-items-received.component';

describe('HireItemsReceivedComponent', () => {
  let component: HireItemsReceivedComponent;
  let fixture: ComponentFixture<HireItemsReceivedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HireItemsReceivedComponent]
    });
    fixture = TestBed.createComponent(HireItemsReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
