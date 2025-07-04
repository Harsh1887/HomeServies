import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPaymentScreenComponent } from './user-payment-screen.component';

describe('UserPaymentScreenComponent', () => {
  let component: UserPaymentScreenComponent;
  let fixture: ComponentFixture<UserPaymentScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserPaymentScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPaymentScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
