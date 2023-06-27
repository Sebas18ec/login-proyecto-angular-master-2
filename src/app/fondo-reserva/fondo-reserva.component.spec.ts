import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FondoReservaComponent } from './fondo-reserva.component';

describe('FondoReservaComponent', () => {
  let component: FondoReservaComponent;
  let fixture: ComponentFixture<FondoReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FondoReservaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FondoReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
