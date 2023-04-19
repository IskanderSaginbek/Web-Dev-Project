import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingsComponent } from './shippings.component';

describe('ShippingsComponent', () => {
  let component: ShippingsComponent;
  let fixture: ComponentFixture<ShippingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
