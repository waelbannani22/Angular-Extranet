import { TestBed } from '@angular/core/testing';

import { BordereauFactureServiceService } from './bordereau-facture-service.service';

describe('BordereauFactureServiceService', () => {
  let service: BordereauFactureServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BordereauFactureServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
