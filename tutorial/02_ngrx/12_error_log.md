# 12 ngrx - Error logging

## customers/store/effects/customer.effects.ts

```ts
/*
   * error handler
   */
  @Effect({ dispatch: false })
  errors$ = this.actions$.pipe(
    ofType(
      fromActions.CustomerActionTypes.LoadCustomersFail,
      fromActions.CustomerActionTypes.AddCustomerFail,
      fromActions.CustomerActionTypes.DeleteCustomerFail,
      fromActions.CustomerActionTypes.UpdateCustomerFail
    ),
    map((action: any) => action.payload),
    switchMap(error => {
      console.log('error', error);

      return this.modalService.openGlobal({
        title: 'App error',
        message: error && error.message || 'The error message',
        type: 'warn'
      });
    })
  );

  constructor(
    private actions$: Actions,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private modalService: ModalService
  ) {}
```
