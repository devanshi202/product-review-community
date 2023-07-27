import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaiseProductComponent } from './raise-product.component';

describe('RaiseProductComponent', () => {
  let component: RaiseProductComponent;
  let fixture: ComponentFixture<RaiseProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RaiseProductComponent]
    });
    fixture = TestBed.createComponent(RaiseProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
