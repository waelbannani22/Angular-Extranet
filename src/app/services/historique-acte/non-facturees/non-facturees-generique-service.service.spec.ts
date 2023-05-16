import { TestBed } from '@angular/core/testing';

import { NonFactureesGeneriqueServiceService } from './non-facturees-generique-service.service';

describe('NonFactureesGeneriqueServiceService', () => {
  let service: NonFactureesGeneriqueServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NonFactureesGeneriqueServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
