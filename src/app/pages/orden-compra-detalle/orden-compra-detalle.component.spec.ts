import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenCompraDetalleComponent } from './orden-compra-detalle.component';

describe('OrdenCompraDetalleComponent', () => {
  let component: OrdenCompraDetalleComponent;
  let fixture: ComponentFixture<OrdenCompraDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdenCompraDetalleComponent]
    });
    fixture = TestBed.createComponent(OrdenCompraDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
