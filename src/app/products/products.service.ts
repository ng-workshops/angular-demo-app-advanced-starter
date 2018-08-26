import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Product } from './product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly endpoint = environment.endpoints.products;

  constructor(private httpClient: HttpClient) { }

  getAll(searchTerm = '') {
    // add search param
    const httpOptions = searchTerm
      ? { params: new HttpParams().set('search', searchTerm) }
      : {};

    return this.httpClient.get<Array<Product>>(this.endpoint, httpOptions);
  }

  getById(id: string) {
    return this.httpClient.get<Product>(`${this.endpoint}/${id}`);
  }

  create(product: Product) {
    return this.httpClient.post<Product>(this.endpoint, product);
  }

  update(product: Product) {
    return this.httpClient.put<Product>(this.endpoint, product);
  }
}
