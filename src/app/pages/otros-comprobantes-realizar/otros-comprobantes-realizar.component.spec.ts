import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosComprobantesRealizarComponent } from './otros-comprobantes-realizar.component';

describe('OtrosComprobantesRealizarComponent', () => {
  let component: OtrosComprobantesRealizarComponent;
  let fixture: ComponentFixture<OtrosComprobantesRealizarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtrosComprobantesRealizarComponent]
    });
    fixture = TestBed.createComponent(OtrosComprobantesRealizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
