import { TestBed, inject } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { HttpClient } from '@angular/common/http';

describe('ProductsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductsService, { provide: HttpClient, useValue: {} }]
    });
  });

  it('should be created', inject(
    [ProductsService],
    (service: ProductsService) => {
      expect(service).toBeTruthy();
    }
  ));
});
