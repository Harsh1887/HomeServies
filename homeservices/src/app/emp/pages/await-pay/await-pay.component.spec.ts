import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AwaitPayComponent } from './await-pay.component';

describe('AwaitPayComponent', () => {
  let component: AwaitPayComponent;
  let fixture: ComponentFixture<AwaitPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AwaitPayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AwaitPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
