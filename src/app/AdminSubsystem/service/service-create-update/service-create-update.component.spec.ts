import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCreateUpdateComponent } from './service-create-update.component';

describe('ServiceCreateUpdateComponent', () => {
  let component: ServiceCreateUpdateComponent;
  let fixture: ComponentFixture<ServiceCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceCreateUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
