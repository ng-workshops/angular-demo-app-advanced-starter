import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  selectedProductId: number;
  searchTerm = new FormControl();

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        return this.loadProducts();
      })
    )
      .subscribe(products => this.products = products);

    this.searchTerm.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(value => {
        return this.loadProducts(value);
      })
    )
      .subscribe(products => this.products = products);
  }

  private loadProducts(searchTerm?: string) {
    return this.productService.getAll(searchTerm);
  }
}
