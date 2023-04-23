import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfrsComponent } from './mfrs.component';

describe('MfrsComponent', () => {
  let component: MfrsComponent;
  let fixture: ComponentFixture<MfrsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MfrsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MfrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
