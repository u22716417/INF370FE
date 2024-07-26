import { TestBed } from '@angular/core/testing';

import { HireServiceService } from './hire-service.service';

describe('HireServiceService', () => {
  let service: HireServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HireServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
