import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodoVacacionComponent } from './periodo-vacacion.component';

describe('PeriodoVacacionComponent', () => {
  let component: PeriodoVacacionComponent;
  let fixture: ComponentFixture<PeriodoVacacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeriodoVacacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeriodoVacacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
