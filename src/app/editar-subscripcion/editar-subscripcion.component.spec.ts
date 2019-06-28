import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSubscripcionComponent } from './editar-subscripcion.component';

describe('EditarSubscripcionComponent', () => {
  let component: EditarSubscripcionComponent;
  let fixture: ComponentFixture<EditarSubscripcionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarSubscripcionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSubscripcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
