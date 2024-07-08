import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentCreateUpdateComponent } from './equipment-create-update.component';

describe('EquipmentCreateUpdateComponent', () => {
  let component: EquipmentCreateUpdateComponent;
  let fixture: ComponentFixture<EquipmentCreateUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EquipmentCreateUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EquipmentCreateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
