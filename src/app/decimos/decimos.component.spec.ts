import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecimosComponent } from './decimos.component';

describe('DecimosComponent', () => {
  let component: DecimosComponent;
  let fixture: ComponentFixture<DecimosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecimosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecimosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
