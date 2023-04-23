import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfrComponent } from './mfr.component';

describe('MfrComponent', () => {
  let component: MfrComponent;
  let fixture: ComponentFixture<MfrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MfrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MfrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
