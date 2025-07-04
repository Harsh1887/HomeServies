import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectServicesComponent } from './reject-services.component';

describe('RejectServicesComponent', () => {
  let component: RejectServicesComponent;
  let fixture: ComponentFixture<RejectServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RejectServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RejectServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
