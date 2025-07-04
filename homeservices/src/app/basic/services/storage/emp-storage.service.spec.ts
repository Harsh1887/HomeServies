import { TestBed } from '@angular/core/testing';

import { EmpStorageService } from './emp-storage.service';

describe('EmpStorageService', () => {
  let service: EmpStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
