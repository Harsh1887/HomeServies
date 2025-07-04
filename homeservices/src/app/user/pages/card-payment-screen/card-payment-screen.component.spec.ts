import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPaymentScreenComponent } from './card-payment-screen.component';

describe('CardPaymentScreenComponent', () => {
  let component: CardPaymentScreenComponent;
  let fixture: ComponentFixture<CardPaymentScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardPaymentScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPaymentScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
