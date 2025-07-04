import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpPaymentComponent } from './emp-payment.component';

describe('EmpPaymentComponent', () => {
  let component: EmpPaymentComponent;
  let fixture: ComponentFixture<EmpPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
