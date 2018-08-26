# 3 ngrx - Edit customer

## customers/store/actions/customer.actions.ts

```ts
export enum CustomerActionTypes {
  LoadCustomers = '[Customer] Load Customers',
  LoadCustomersSuccess = '[Customer] Load customers success',
  LoadCustomersFail = '[Customer] Load customers fail',
  SelectCustomer = '[Customer] Select customer'
}

export class SelectCustomer implements Action {
  readonly type = CustomerActionTypes.SelectCustomer;
  constructor(public payload: number) {}
}

export type CustomerActions =
  | LoadCustomers
  | LoadCustomersSuccess
  | LoadCustomersFail
  | SelectCustomer;
```

## customers/store/selectors/customer.selectors.ts

```ts
export const getSelectedCustomerId = createSelector(
  getCustomersStore,
  store => store.selectedCustomerId
);
export const getSelectedCustomer = createSelector(
  getCustomers,
  getSelectedCustomerId,
  (customers, selectedCustomerId) =>
    customers.find(c => c.id === selectedCustomerId)
);
```

## customers/customer-form/customer-form.component.ts

```ts
export class CustomerFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  private destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private store: Store<CustomerState>
  ) {}

  ngOnInit() {
    this.form = Customer.toFormGroup();

    this.store
      .select(getSelectedCustomer)
      .pipe(
        filter(customer => !!customer),
        takeUntil(this.destroy$)
      )
      .subscribe(customer => {
        this.form.patchValue(customer);
      });

    const id = this.route.snapshot.params.id;

    if (id !== 'new') {
      this.store.dispatch(new SelectCustomer(parseInt(id, 10)));
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
```