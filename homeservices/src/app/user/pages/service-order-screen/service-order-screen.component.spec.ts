import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOrderScreenComponent } from './service-order-screen.component';

describe('ServiceOrderScreenComponent', () => {
  let component: ServiceOrderScreenComponent;
  let fixture: ComponentFixture<ServiceOrderScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceOrderScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceOrderScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
