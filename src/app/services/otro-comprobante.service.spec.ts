import { TestBed } from '@angular/core/testing';

import { OtroComprobanteService } from './otro-comprobante.service';

describe('OtroComprobanteService', () => {
  let service: OtroComprobanteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OtroComprobanteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
