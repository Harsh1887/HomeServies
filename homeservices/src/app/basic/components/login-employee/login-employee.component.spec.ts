import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEmployeeComponent } from './login-employee.component';

describe('LoginEmployeeComponent', () => {
  let component: LoginEmployeeComponent;
  let fixture: ComponentFixture<LoginEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginEmployeeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
