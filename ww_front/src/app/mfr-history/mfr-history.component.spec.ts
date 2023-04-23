import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MfrHistoryComponent } from './mfr-history.component';

describe('MfrHistoryComponent', () => {
  let component: MfrHistoryComponent;
  let fixture: ComponentFixture<MfrHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MfrHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MfrHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
