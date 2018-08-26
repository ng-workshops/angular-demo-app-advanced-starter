# 2 ngrx - All customers

## customers/store/actions/customer.actions.ts

```ts
import { Action } from '@ngrx/store';
import { Customer } from '../../customer.model';

export enum CustomerActionTypes {
  LoadCustomers = '[Customer] Load Customers',
  LoadCustomersSuccess = '[Customer] Load customers success',
  LoadCustomersFail = '[Customer] Load customers fail'
}

export class LoadCustomers implements Action {
  readonly type = CustomerActionTypes.LoadCustomers;
}

export class LoadCustomersSuccess implements Action {
  readonly type = CustomerActionTypes.LoadCustomersSuccess;
  constructor(public payload: Customer[]) {}
}

export class LoadCustomersFail implements Action {
  readonly type = CustomerActionTypes.LoadCustomersFail;
  constructor(public payload: any) {}
}

export type CustomerActions =
  | LoadCustomers
  | LoadCustomersSuccess
  | LoadCustomersFail;
```

## customers/store/reducers/customer.reducer.ts

```ts
case CustomerActionTypes.LoadCustomersSuccess: {
      const customers = action.payload;

      return {
        ...state,
        loading: false,
        selectedCustomerId: null,
        customers
      };
    }

    case CustomerActionTypes.LoadCustomersFail: {
      return {
        ...state,
        loading: false
      };
    }
```

## customers/store/effects/customer.effects.ts

```ts
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CustomerService } from '../../customer.service';
import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromActions from '../actions/customer.actions';

@Injectable({
  providedIn: 'root'
})
export class CustomerEffects {
  /*
   * load all customers list and dispatch LoadCustomersSuccess action
   */
  @Effect()
  loadCustomers$ = this.actions$.pipe(
    ofType(fromActions.CustomerActionTypes.LoadCustomers),
    switchMap(_ => {
      return this.customerService.getAll().pipe(
        map(customers => new fromActions.LoadCustomersSuccess(customers)),
        catchError(err => of(new fromActions.LoadCustomersFail(err)))
      );
    })
  );

  constructor(
    private actions$: Actions,
    private customerService: CustomerService
  ) {}
}
```

## customers/customer-list/customer-list.component.ts

```ts
export class CustomerListComponent implements OnInit {
  customers$: Observable<Customer[]>;
  loading$: Observable<boolean>;

  ngOnInit() {
    // set up selectors
    this.loading$ = this.store.select(getLoading);
    this.customers$ = this.store.select(getCustomers);

    this.store.dispatch(new LoadCustomers());
  }
}
```

## customers/customer-list/customer-list.component.html

```html
<mat-progress-bar *ngIf="loading$ | async" color="primary" mode="indeterminate"></mat-progress-bar>
```
