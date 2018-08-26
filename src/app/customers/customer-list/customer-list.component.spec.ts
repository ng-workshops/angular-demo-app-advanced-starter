import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListComponent } from './customer-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { of } from 'rxjs';

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  // let customerServiceSpy: jasmine.SpyObj<CustomerService>;
  let customerServiceSpy: any;


  beforeEach(async(() => {
    // const spy = jasmine.createSpyObj('CustomerService', ['getAll']);
    const spy = { getAll: () => of([]) };

    TestBed.configureTestingModule({
      declarations: [CustomerListComponent],
      providers: [
        { provide: Router, useValue: {} },
        { provide: CustomerService, useValue: spy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();

    customerServiceSpy = TestBed.get(CustomerService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
