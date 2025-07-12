import { TestBed } from '@angular/core/testing';

import { WineService } from './wineservice';

describe('Wine', () => {
  let service: WineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
