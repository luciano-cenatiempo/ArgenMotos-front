import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CobranzaFormComponent } from './cobranza-form.component';

describe('CobranzaFormComponent', () => {
  let component: CobranzaFormComponent;
  let fixture: ComponentFixture<CobranzaFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CobranzaFormComponent]
    });
    fixture = TestBed.createComponent(CobranzaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
