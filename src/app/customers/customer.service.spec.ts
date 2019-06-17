import { TestBed, inject } from '@angular/core/testing';

import { CustomerService } from './customer.service';
import { HttpClient } from '@angular/common/http';

describe('CustomerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerService, { provide: HttpClient, useValue: {} }]
    });
  });

  it('should be created', inject(
    [CustomerService],
    (service: CustomerService) => {
      expect(service).toBeTruthy();
    }
  ));
});
