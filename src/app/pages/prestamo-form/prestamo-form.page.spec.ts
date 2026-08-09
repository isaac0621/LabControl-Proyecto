import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrestamoFormPage } from './prestamo-form.page';

describe('PrestamoFormPage', () => {
  let component: PrestamoFormPage;
  let fixture: ComponentFixture<PrestamoFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestamoFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
