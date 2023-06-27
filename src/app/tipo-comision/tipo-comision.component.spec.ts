import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoComisionComponent } from './tipo-comision.component';

describe('TipoComisionComponent', () => {
  let component: TipoComisionComponent;
  let fixture: ComponentFixture<TipoComisionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoComisionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoComisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
