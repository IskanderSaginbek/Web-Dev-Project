import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfrPrefComponent } from './mfr-pref.component';

describe('MfrPrefComponent', () => {
  let component: MfrPrefComponent;
  let fixture: ComponentFixture<MfrPrefComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MfrPrefComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MfrPrefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
