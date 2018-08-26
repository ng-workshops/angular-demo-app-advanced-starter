# 8 ngrx - Router Store

## app/store/index.ts

```ts
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import * as fromRouter from '@ngrx/router-store';
import { RouterStateUrl } from '../core/router/router.serializer';
import { RouterEffects } from '../core/router/router.effects';

// tslint:disable-next-line:no-empty-interface
export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>; // default from ngrx
}

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer // default from ngrx
};

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? []
  : [];

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('router');

export const effects: any[] = [RouterEffects];
```

## app.module.ts

```ts
imports: [
  StoreRouterConnectingModule,
  EffectsModule.forRoot(effects),
],
providers: [
  httpInterceptorProviders,
  { provide: RouterStateSerializer, useClass: CustomSerializer }
]
```

## customers/store/effects/customer.effects.ts

```ts
/*
   * save customer success
   */
  @Effect()
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
    map(
      _ =>
        new Go({
          path: ['/customers']
        })
    )
  );
```

## customers/customer-list/customer-list.component.ts

```ts
addNewCustomer() {
    this.store.dispatch(new Go({ path: ['customers', 'new'] }));
  }
```
