import { TestBed } from '@angular/core/testing';

import { HistoriqueActeService } from './historique-acte.service';

describe('HistoriqueActeService', () => {
  let service: HistoriqueActeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoriqueActeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
