import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtrosComprobantesComponent } from './otros-comprobantes.component';

describe('OtrosComprobantesComponent', () => {
  let component: OtrosComprobantesComponent;
  let fixture: ComponentFixture<OtrosComprobantesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtrosComprobantesComponent]
    });
    fixture = TestBed.createComponent(OtrosComprobantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
