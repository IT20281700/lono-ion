import { TestBed } from '@angular/core/testing';

import { ConfirmedValidatorService } from './confirmed.validator.service';

describe('ConfirmedValidatorService', () => {
  let service: ConfirmedValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmedValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
