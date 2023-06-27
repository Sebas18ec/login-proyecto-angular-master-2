import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaOcupacionalComponent } from './categoria-ocupacional.component';

describe('CategoriaOcupacionalComponent', () => {
  let component: CategoriaOcupacionalComponent;
  let fixture: ComponentFixture<CategoriaOcupacionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriaOcupacionalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriaOcupacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
