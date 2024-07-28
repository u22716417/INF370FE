import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewServiceComponent } from './view-service.component';

describe('ViewServiceComponent', () => {
  let component: ViewServiceComponent;
  let fixture: ComponentFixture<ViewServiceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewServiceComponent]
    });
    fixture = TestBed.createComponent(ViewServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
