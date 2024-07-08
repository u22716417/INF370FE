import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaqCreateUpdateComponent } from './faq-create-update.component';

describe('FaqCreateUpdateComponent', () => {
  let component: FaqCreateUpdateComponent;
  let fixture: ComponentFixture<FaqCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FaqCreateUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FaqCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
