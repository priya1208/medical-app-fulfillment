import { TestBed } from '@angular/core/testing';

import { Medicineservice } from './medicineservice';

describe('Medicineservice', () => {
  let service: Medicineservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Medicineservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
