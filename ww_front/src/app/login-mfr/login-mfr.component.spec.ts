import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMfrComponent } from './login-mfr.component';

describe('LoginMfrComponent', () => {
  let component: LoginMfrComponent;
  let fixture: ComponentFixture<LoginMfrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginMfrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginMfrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
