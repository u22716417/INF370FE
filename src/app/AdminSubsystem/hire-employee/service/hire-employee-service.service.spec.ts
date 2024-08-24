import { TestBed } from '@angular/core/testing';

import { HireEmployeeServiceService } from './hire-employee-service.service';

describe('HireEmployeeServiceService', () => {
  let service: HireEmployeeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HireEmployeeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
