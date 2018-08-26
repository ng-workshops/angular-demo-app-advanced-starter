# 7 ngrx - Search customer

## customers/store/actions/customer.actions.ts

```ts
import { Action } from '@ngrx/store';
import { Customer } from '../../customer.model';

export enum CustomerActionTypes {
  LoadCustomers = '[Customer] Load Customers',
  LoadCustomersSuccess = '[Customer] Load customers success',
  LoadCustomersFail = '[Customer] Load customers fail',
  SelectCustomer = '[Customer] Select customer',
  AddCustomer = '[Customer] Add customer',
  AddCustomerSuccess = '[Customer] Add customer success',
  AddCustomerFail = '[Customer] Add customer fail',
  UpdateCustomer = '[Customer] Update customer',
  UpdateCustomerSuccess = '[Customer] Update customer success',
  UpdateCustomerFail = '[Customer] Update customer fail',
  DeleteCustomer = '[Customer] Delete customer',
  DeleteCustomerSuccess = '[Customer] Delete customer success',
  DeleteCustomerFail = '[Customer] Delete customer fail',
  SearchCustomer = '[Customer] Search customer'
}

export class SearchCustomer implements Action {
  readonly type = CustomerActionTypes.SearchCustomer;
  constructor(public payload: string) {}
}

export type CustomerActions =
  | LoadCustomers
  | LoadCustomersSuccess
  | LoadCustomersFail
  | SelectCustomer
  | AddCustomer
  | AddCustomerSuccess
  | AddCustomerFail
  | UpdateCustomer
  | UpdateCustomerSuccess
  | UpdateCustomerFail
  | DeleteCustomer
  | DeleteCustomerSuccess
  | DeleteCustomerFail
  | SearchCustomer;
```

## customers/store/reducers/customer.reducer.ts

```ts
case CustomerActionTypes.SearchCustomer: {
      const search = action.payload;

      return {
        ...state,
        loading: true,
        search
      };
    }
```

## customers/store/effects/customer.effects.ts

```ts
 /*
   * load or search all customers list and dispatch LoadCustomersSuccess action
   */
  @Effect()
  loadCustomers$ = this.actions$.pipe(
    ofType(
      fromActions.CustomerActionTypes.LoadCustomers,
      fromActions.CustomerActionTypes.SearchCustomer
    ),
    map((action: any) => action.payload),
    switchMap(search => {
      return this.customerService.getAll(search).pipe(
        map(customers => new fromActions.LoadCustomersSuccess(customers)),
        catchError(err => of(new fromActions.LoadCustomersFail(err)))
      );
    })
  );
```

## customers/customer-list/customer-list.component.ts

```ts
export class CustomerListComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();

  ngOnInit() {
    this.searchTerm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(search => this.store.dispatch(new SearchCustomer(search)));

    // set up selectors
    this.loading$ = this.store.select(getLoading);
    this.customers$ = this.store.select(getCustomers);

    this.store.dispatch(new LoadCustomers());
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
```
