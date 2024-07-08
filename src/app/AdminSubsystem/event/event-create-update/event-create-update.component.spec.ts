import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreateUpdateComponent } from './event-create-update.component';

describe('EventCreateUpdateComponent', () => {
  let component: EventCreateUpdateComponent;
  let fixture: ComponentFixture<EventCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EventCreateUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
