import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductEmptyComponent } from './product-empty/product-empty.component';

@NgModule({
  imports: [
    ProductsRoutingModule,
    SharedModule
  ],
  declarations: [
    ProductsComponent,
    ProductListComponent,
    ProductDetailsComponent,
    ProductEmptyComponent
  ]
})
export class ProductsModule { }
