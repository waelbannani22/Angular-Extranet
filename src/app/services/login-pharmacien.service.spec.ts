import { TestBed } from '@angular/core/testing';

import { LoginPharmacienService } from './login-pharmacien.service';

describe('LoginPharmacienService', () => {
  let service: LoginPharmacienService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginPharmacienService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
