import { TestBed } from '@angular/core/testing';

import { FilterValuesServiceService } from './filter-values-service.service';

describe('FilterValuesServiceService', () => {
  let service: FilterValuesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterValuesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
