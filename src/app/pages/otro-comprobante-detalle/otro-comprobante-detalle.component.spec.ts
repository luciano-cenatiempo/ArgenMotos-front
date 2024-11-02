import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtroComprobanteDetalleComponent } from './otro-comprobante-detalle.component';

describe('OtroComprobanteDetalleComponent', () => {
  let component: OtroComprobanteDetalleComponent;
  let fixture: ComponentFixture<OtroComprobanteDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtroComprobanteDetalleComponent]
    });
    fixture = TestBed.createComponent(OtroComprobanteDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
