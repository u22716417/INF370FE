import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectHireItemsComponent } from './collect-hire-items.component';

describe('CollectHireItemsComponent', () => {
  let component: CollectHireItemsComponent;
  let fixture: ComponentFixture<CollectHireItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollectHireItemsComponent]
    });
    fixture = TestBed.createComponent(CollectHireItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
