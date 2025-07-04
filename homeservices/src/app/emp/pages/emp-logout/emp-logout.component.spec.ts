import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpLogoutComponent } from './emp-logout.component';

describe('EmpLogoutComponent', () => {
  let component: EmpLogoutComponent;
  let fixture: ComponentFixture<EmpLogoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpLogoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpLogoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
