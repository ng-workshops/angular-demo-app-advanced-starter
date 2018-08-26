import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductEmptyComponent } from './product-empty.component';

describe('ProductEmptyComponent', () => {
  let component: ProductEmptyComponent;
  let fixture: ComponentFixture<ProductEmptyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductEmptyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductEmptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
