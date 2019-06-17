import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsService } from '../products.service';
import { Product } from '../product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductResolver implements Resolve<Product> {
  constructor(private productsService: ProductsService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> {
    return this.productsService.getById(route.paramMap.get('id'));
  }
}
