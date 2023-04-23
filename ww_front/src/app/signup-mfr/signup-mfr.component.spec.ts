import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupMfrComponent } from './signup-mfr.component';

describe('SignupMfrComponent', () => {
  let component: SignupMfrComponent;
  let fixture: ComponentFixture<SignupMfrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignupMfrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupMfrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
