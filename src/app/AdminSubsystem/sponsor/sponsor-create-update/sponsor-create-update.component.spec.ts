import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorCreateUpdateComponent } from './sponsor-create-update.component';

describe('SponsorCreateUpdateComponent', () => {
  let component: SponsorCreateUpdateComponent;
  let fixture: ComponentFixture<SponsorCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SponsorCreateUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SponsorCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
