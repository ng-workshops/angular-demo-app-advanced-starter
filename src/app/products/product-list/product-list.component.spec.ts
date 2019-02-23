import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { LOCALE_ID, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ProductsService } from '../products.service';
import { ProductListComponent } from './product-list.component';

registerLocaleData(localeDe, 'de');

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async(() => {
    const activeRouteParamMapListener = new Subject();
    const activeRouteStub = {
      paramMap: activeRouteParamMapListener
    };

    TestBed.configureTestingModule({
      imports: [MatTableModule],
      declarations: [ProductListComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activeRouteStub },
        { provide: ProductsService, useValue: {} },
        { provide: LOCALE_ID, useValue: 'de' }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
