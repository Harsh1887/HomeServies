import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveBookingsComponent } from './active-bookings.component';

describe('ActiveBookingsComponent', () => {
  let component: ActiveBookingsComponent;
  let fixture: ComponentFixture<ActiveBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActiveBookingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
