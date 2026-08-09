import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponsableFormPage } from './responsable-form.page';

describe('ResponsableFormPage', () => {
  let component: ResponsableFormPage;
  let fixture: ComponentFixture<ResponsableFormPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsableFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
