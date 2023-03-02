import { TestBed } from '@angular/core/testing';

import { DimensionFilterValueServiceService } from './dimension-filter-value-service.service';

describe('DimensionFilterValueServiceService', () => {
  let service: DimensionFilterValueServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DimensionFilterValueServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
