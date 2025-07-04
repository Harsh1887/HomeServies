import { TestBed } from '@angular/core/testing';

import { AdminStorageService } from './admin-storage.service';

describe('AdminStorageService', () => {
  let service: AdminStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
