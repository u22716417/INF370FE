import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuotationComponent } from './create-quotation.component';

describe('CreateQuotationComponent', () => {
  let component: CreateQuotationComponent;
  let fixture: ComponentFixture<CreateQuotationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateQuotationComponent]
    });
    fixture = TestBed.createComponent(CreateQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
