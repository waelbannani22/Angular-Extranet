import { TestBed } from '@angular/core/testing';

import { VerifMedicamentServiceService } from './verif-medicament-service.service';

describe('VerifMedicamentServiceService', () => {
  let service: VerifMedicamentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VerifMedicamentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
