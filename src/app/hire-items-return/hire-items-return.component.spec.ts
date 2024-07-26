import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireItemsReturnComponent } from './hire-items-return.component';

describe('HireItemsReturnComponent', () => {
  let component: HireItemsReturnComponent;
  let fixture: ComponentFixture<HireItemsReturnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HireItemsReturnComponent]
    });
    fixture = TestBed.createComponent(HireItemsReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
