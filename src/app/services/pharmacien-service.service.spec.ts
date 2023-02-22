import { TestBed } from '@angular/core/testing';

import { PharmacienServiceService } from './pharmacien-service.service';

describe('PharmacienServiceService', () => {
  let service: PharmacienServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PharmacienServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
