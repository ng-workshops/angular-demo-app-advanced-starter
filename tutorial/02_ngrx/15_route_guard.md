# 15 ngrx - Route Guard

## customer/store/reducers/customer.reducers.ts

```ts
// CustomerState
loaded: boolean;

// initialState
loaded: true;

// LoadCustomersSuccess
loaded: true;

// LoadCustomersFail
loaded: false;
```

## customers/store/selectors/customer.selectors.ts

```ts
export const getLoaded = createSelector(
  getCustomersStore,
  store => store.loaded
);
```

## customers/guards/customer-exists.guard.ts

```ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap, map, filter, take, switchMap } from 'rxjs/operators';

import { CustomerState } from '../store/reducers/customer.reducer';
import * as fromSelectors from '../store/selectors/customer.selectors';
import * as fromActions from '../store/actions/customer.actions';

@Injectable({
  providedIn: 'root'
})
export class CustomerExistsGuard implements CanActivate {
  constructor(private store: Store<CustomerState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => {
        const id = parseInt(route.params.id, 10);
        return this.hasCustomer(id);
      })
    );
  }

  hasCustomer(id: number): Observable<boolean> {
    return this.store.select(fromSelectors.getCustomers).pipe(
      map(customers => !!customers.find(c => c.id === id)),
      take(1)
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromSelectors.getLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new fromActions.LoadCustomers());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
```

## customers/customers-routing.module.ts

```ts
 {
    path: 'customers/new',
    component: CustomerFormComponent
  },
  {
    path: 'customers/:id',
    component: CustomerFormComponent,
    canActivate: [CustomerExistsGuard]
  }
```
