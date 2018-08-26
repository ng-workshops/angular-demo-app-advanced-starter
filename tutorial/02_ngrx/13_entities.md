# 13 ngrx - using entities instead of arrays

## customers/store/reducers/customer.reducer.ts

```ts
export interface CustomerState {
  loading: boolean;
  customers: Customer[];
  customersEntities: { [id: number]: Customer };
  selectedCustomerId?: number;
  search?: string;
}

case CustomerActionTypes.LoadCustomersSuccess: {
  const customers = action.payload.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});

      return {
        ...state,
        loading: false,
        selectedCustomerId: null,
        customers
      };
    }
```

## customers/store/selectors/customer.selector.ts

```ts
export const getCustomers = createSelector(getCustomersStore, store =>
  Object.keys(store.customers).map(key => store.customers[key])
);
```
