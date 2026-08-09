import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EquipoDetallePage } from './equipo-detalle.page';

describe('EquipoDetallePage', () => {
  let component: EquipoDetallePage;
  let fixture: ComponentFixture<EquipoDetallePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipoDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
