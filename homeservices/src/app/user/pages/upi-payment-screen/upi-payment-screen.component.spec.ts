import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpiPaymentScreenComponent } from './upi-payment-screen.component';

describe('UpiPaymentScreenComponent', () => {
  let component: UpiPaymentScreenComponent;
  let fixture: ComponentFixture<UpiPaymentScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpiPaymentScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpiPaymentScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
