import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap
} from 'rxjs/operators';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  selectedProductId: number;
  searchTerm = new FormControl();
  displayedColumns = ['id', 'name', 'price'];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          return this.loadProducts();
        }),
        startWith([])
      )
      .subscribe(products => (this.products = products));

    this.searchTerm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(value => {
          return this.loadProducts(value);
        })
      )
      .subscribe(products => (this.products = products));
  }

  getTotal() {
    return this.products
      .map(p => p.price)
      .reduce((acc, value) => acc + value, 0);
  }

  private loadProducts(searchTerm?: string) {
    return this.productService.getAll(searchTerm);
  }
}
