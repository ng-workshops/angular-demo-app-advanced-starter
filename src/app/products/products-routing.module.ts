import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductResolver } from './product-details/product.resolver';
import { ProductEmptyComponent } from './product-empty/product-empty.component';
import { CanDeactivateGuard } from '../core/can-deactivate/can-deactivate-guard.service';

const routes = [
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        path: '',
        component: ProductListComponent,
        children: [
          {
            path: ':id',
            component: ProductDetailsComponent,
            canDeactivate: [CanDeactivateGuard],
            resolve: {
              product: ProductResolver
            }
          },
          {
            path: '',
            component: ProductEmptyComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
