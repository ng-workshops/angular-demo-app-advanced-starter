# 4 ngrx - Add customer

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
  AddCustomerFail = '[Customer] Add customer fail'
}

export class AddCustomer implements Action {
  readonly type = CustomerActionTypes.AddCustomer;
  constructor(public payload: Customer) {}
}

export class AddCustomerSuccess implements Action {
  readonly type = CustomerActionTypes.AddCustomerSuccess;
  constructor(public payload: Customer) {}
}

export class AddCustomerFail implements Action {
  readonly type = CustomerActionTypes.AddCustomerFail;
  constructor(public payload: any) {}
}

export type CustomerActions =
  | LoadCustomers
  | LoadCustomersSuccess
  | LoadCustomersFail
  | SelectCustomer
  | AddCustomer
  | AddCustomerSuccess
  | AddCustomerFail;
```

## customers/store/reducers/customer.reducer.ts

```ts
case CustomerActionTypes.AddCustomerSuccess: {
      const newCustomer = action.payload;
      const customers = [...state.customers, newCustomer];

      return {
        ...state,
        customers
      };
    }
```

## customers/store/effects/customer.effects.ts

```ts
/*
   * add a new customer
   */
  @Effect()
  addCustomers$ = this.actions$.pipe(
    ofType(fromActions.CustomerActionTypes.AddCustomer),
    map((action: fromActions.AddCustomer) => action.payload),
    concatMap(customer =>
      this.customerService.create(customer).pipe(
        map(newCustomer => new fromActions.AddCustomerSuccess(newCustomer)),
        catchError(err => of(new fromActions.AddCustomerFail(err)))
      )
    )
  );

  /*
   * save customer success
   */
  @Effect({ dispatch: false })
  saveCustomersSuccess$ = this.actions$.pipe(
    ofType(fromActions.CustomerActionTypes.AddCustomerSuccess),
    map((action: fromActions.AddCustomerSuccess) => action.payload),
    tap(customer => {
      this.snackBar.open(`Customer ${customer.name} saved successfully.`, '', {
        duration: 2000
      });
    }),
    map(_ => this.router.navigateByUrl('/customers'))
  );

  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}
```

## customers/customer-form/customer-form.component.ts

```ts
 submit() {
    const data = this.form.getRawValue();
    this.store.dispatch(new AddCustomer(data));
  }
```
