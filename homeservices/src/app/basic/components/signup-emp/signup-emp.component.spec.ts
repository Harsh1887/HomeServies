import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupEmpComponent } from './signup-emp.component';

describe('SignupEmpComponent', () => {
  let component: SignupEmpComponent;
  let fixture: ComponentFixture<SignupEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupEmpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
