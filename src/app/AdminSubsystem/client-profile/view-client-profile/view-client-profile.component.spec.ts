import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientProfileComponent } from './view-client-profile.component';

describe('ViewClientProfileComponent', () => {
  let component: ViewClientProfileComponent;
  let fixture: ComponentFixture<ViewClientProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewClientProfileComponent]
    });
    fixture = TestBed.createComponent(ViewClientProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
