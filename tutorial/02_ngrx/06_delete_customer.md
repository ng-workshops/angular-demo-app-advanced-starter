# 6 ngrx - Delete customer

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
  DeleteCustomerFail = '[Customer] Delete customer fail'
}

export class DeleteCustomer implements Action {
  readonly type = CustomerActionTypes.DeleteCustomer;
  constructor(public payload: number) {}
}

export class DeleteCustomerSuccess implements Action {
  readonly type = CustomerActionTypes.DeleteCustomerSuccess;
  constructor(public payload: number) {}
}

export class DeleteCustomerFail implements Action {
  readonly type = CustomerActionTypes.DeleteCustomerFail;
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
  | UpdateCustomerFail
  | DeleteCustomer
  | DeleteCustomerSuccess
  | DeleteCustomerFail;
```

## customers/store/reducers/customer.reducer.ts

```ts
case CustomerActionTypes.DeleteCustomerSuccess: {
      const id = action.payload;
      const customers = [...state.customers.filter(c => c.id !== id)];

      return {
        ...state,
        customers
      };
    }
```

## customers/store/effects/customer.effects.ts

```ts
 /*
   * delete a customer
   */
  @Effect()
  deleteCustomers$ = this.actions$.pipe(
    ofType(fromActions.CustomerActionTypes.DeleteCustomer),
    map((action: fromActions.DeleteCustomer) => action.payload),
    concatMap(id =>
      this.customerService.delete(id).pipe(
        map(_ => new fromActions.DeleteCustomerSuccess(id)),
        catchError(err => of(new fromActions.DeleteCustomerFail(err)))
      )
    )
  );
```

## customers/customer-list/customer-list.component.ts

```ts
deleteCustomer(id: number) {
    this.store.dispatch(new DeleteCustomer(id));
  }
```
