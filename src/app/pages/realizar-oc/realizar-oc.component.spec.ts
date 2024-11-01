import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealizarOCComponent } from './realizar-oc.component';

describe('RealizarOCComponent', () => {
  let component: RealizarOCComponent;
  let fixture: ComponentFixture<RealizarOCComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RealizarOCComponent]
    });
    fixture = TestBed.createComponent(RealizarOCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
