import { TestBed } from '@angular/core/testing';

import { Eventservice } from './eventservice';

describe('Eventservice', () => {
  let service: Eventservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Eventservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
