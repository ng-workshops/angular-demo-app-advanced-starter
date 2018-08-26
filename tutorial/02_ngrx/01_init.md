# 1 ngrx - Init stores

https://github.com/ngrx/platform/blob/master/docs/schematics/store.md

$ ng generate store State --root --statePath store --stateInterface AppState --module app.module.ts

## store/index.ts

```ts
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

// tslint:disable-next-line:no-empty-interface
export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];
```

$ ng generate feature customers/store/Customer --module customers/customers.module.ts --group

## customers/store/reducers/customer.reducer.ts

```ts
import { Action } from '@ngrx/store';
import {
  CustomerActions,
  CustomerActionTypes
} from '../actions/customer.actions';
import { Customer } from '../../customer.model';

export interface CustomerState {
  loading: boolean;
  customers: Customer[];
  selectedCustomerId?: number;
  search?: string;
}

export const initialState: CustomerState = {
  loading: false,
  customers: []
};

export function reducer(
  state = initialState,
  action: CustomerActions
): CustomerState {
  switch (action.type) {
    case CustomerActionTypes.LoadCustomers:
      return {
        ...state,
        loading: true
      };

    default:
      return state;
  }
}
```

$ touch customers/store/selectors/customer.selectors.ts

## customers/store/selectors/customer.selectors.ts

```ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerState } from '../reducers/customer.reducer';
/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getCustomersStore = createFeatureSelector<CustomerState>(
  'customer'
);

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state.
 */
export const getLoading = createSelector(
  getCustomersStore,
  store => store.loading
);
export const getCustomers = createSelector(
  getCustomersStore,
  store => store.customers
);
```

## app.module.ts

```ts
EffectsModule.forRoot([]);
```

## customers/store/effects/customer.effects.ts

```ts
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CustomerActionTypes } from '../actions/customer.actions';

@Injectable({
  providedIn: 'root'
})
export class CustomerEffects {
  // @Effect()
  // loadFoos$ = this.actions$.pipe(ofType(CustomerActionTypes.LoadCustomers));

  constructor(private actions$: Actions) {}
}
```

## customers/customer-list/customer-list.component.ts

```ts
constructor(
    private router: Router,
    private customerService: CustomerService,
    private store: Store<CustomerState>
  ) { }

ngOnInit() {
    this.store.dispatch(new LoadCustomers());
  }
```
