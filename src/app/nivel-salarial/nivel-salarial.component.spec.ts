import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelSalarialComponent } from './nivel-salarial.component';

describe('NivelSalarialComponent', () => {
  let component: NivelSalarialComponent;
  let fixture: ComponentFixture<NivelSalarialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NivelSalarialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NivelSalarialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
