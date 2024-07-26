import { TestBed } from '@angular/core/testing';

import { HireItemService } from './hire-item.service';

describe('HireEquipmentService', () => {
  let service: HireItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HireItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
