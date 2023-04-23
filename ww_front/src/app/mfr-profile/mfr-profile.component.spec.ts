import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfrProfileComponent } from './mfr-profile.component';

describe('MfrProfileComponent', () => {
  let component: MfrProfileComponent;
  let fixture: ComponentFixture<MfrProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MfrProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MfrProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
