import { TestBed } from '@angular/core/testing';

import { Patientservice } from './patientservice';

describe('Patientservice', () => {
  let service: Patientservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Patientservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
