import { TestBed } from '@angular/core/testing';

import {  adminService } from './admin-service.service';

describe('AdminServiceService', () => {
  let service: adminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(adminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
