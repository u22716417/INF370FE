import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireEquipmentComponent } from './hire-equipment.component';

describe('HireEquipmentComponent', () => {
  let component: HireEquipmentComponent;
  let fixture: ComponentFixture<HireEquipmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HireEquipmentComponent]
    });
    fixture = TestBed.createComponent(HireEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
