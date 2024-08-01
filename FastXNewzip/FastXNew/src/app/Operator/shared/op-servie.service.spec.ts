import { TestBed } from '@angular/core/testing';

import { OpServiceService } from './op-servie.service';

describe('OpServieService', () => {
  let service: OpServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
