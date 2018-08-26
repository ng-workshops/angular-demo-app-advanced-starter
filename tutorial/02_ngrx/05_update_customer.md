# 5 ngrx - Update customer

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
  UpdateCustomerFail = '[Customer] Update customer fail'
}

export class UpdateCustomer implements Action {
  readonly type = CustomerActionTypes.UpdateCustomer;
  constructor(public payload: Customer) {}
}

export class UpdateCustomerSuccess implements Action {
  readonly type = CustomerActionTypes.UpdateCustomerSuccess;
  constructor(public payload: Customer) {}
}

export class UpdateCustomerFail implements Action {
  readonly type = CustomerActionTypes.UpdateCustomerFail;
  constructor(public payload: any) {}
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
  | UpdateCustomerFail;
```

## customers/store/effects/customer.effects.ts

```ts
/*
   * update a customer
   */
  @Effect()
  updateCustomers$ = this.actions$.pipe(
    ofType(fromActions.CustomerActionTypes.UpdateCustomer),
    map((action: fromActions.UpdateCustomer) => action.payload),
    concatMap(customer =>
      this.customerService.update(customer).pipe(
        map(newCustomer => new fromActions.UpdateCustomerSuccess(newCustomer)),
        catchError(err => of(new fromActions.UpdateCustomerFail(err)))
      )
    )
  );

  /*
   * save customer success
   */
  @Effect({ dispatch: false })
  saveCustomersSuccess$ = this.actions$.pipe(
    ofType(
      fromActions.CustomerActionTypes.AddCustomerSuccess,
      fromActions.CustomerActionTypes.UpdateCustomerSuccess
    ),
    map(
      (action: fromActions.AddCustomerSuccess | fromActions.UpdateCustomer) =>
        action.payload
    ),
    tap(customer => {
      this.snackBar.open(`Customer ${customer.name} saved successfully.`, '', {
        duration: 2000
      });
    }),
    map(_ => this.router.navigateByUrl('/customers'))
  );
```

## customers/customer-form/customer-form.component.ts

```ts
 submit() {
    const data = this.form.getRawValue();
    this.store.dispatch(
      data.id ? new UpdateCustomer(data) : new AddCustomer(data)
    );
  }
```
