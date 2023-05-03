import { TestBed } from '@angular/core/testing';

import { XmlTojsonService } from './xml-tojson.service';

describe('XmlTojsonService', () => {
  let service: XmlTojsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(XmlTojsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
