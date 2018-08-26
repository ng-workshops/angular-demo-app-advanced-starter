# 2 testing - reducers

## customers/store/reducers/customer.reducer.spec.ts

```ts
import * as fromCustomers from './customer.reducer';
import * as fromActions from '../actions/customer.actions';

const customerMockData = require('../../../../../server/mocks/customers/customers.json');

describe('CustomersReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const { initialState } = fromCustomers;
      const action = {} as any;
      const state = fromCustomers.reducer(undefined, action);

      expect(state).toBe(initialState);
    });
  });

  describe('LOAD_CUSTOMERS action', () => {
    it('should set loading to true', () => {
      const { initialState } = fromCustomers;
      const action = new fromActions.LoadCustomers();
      const state = fromCustomers.reducer(initialState, action);

      expect(state.loading).toEqual(true);
      expect(state.customers).toEqual([]);
    });
  });

  describe('LOAD_CUSTOMERS_SUCCESS action', () => {
    it('should set loading to false and populate customers', () => {
      const { initialState } = fromCustomers;
      const action = new fromActions.LoadCustomersSuccess(customerMockData);
      const state = fromCustomers.reducer(initialState, action);

      expect(state.loading).toEqual(false);
      expect(state.customers).toEqual(customerMockData);
    });
  });

  describe('SELECT_CUSTOMER action', () => {
    it('should set the selectedCustomerId in the store', () => {
      const { initialState } = fromCustomers;
      const id = customerMockData[0].id;
      const action = new fromActions.SelectCustomer(id);
      const state = fromCustomers.reducer(initialState, action);

      expect(state.loading).toEqual(false);
      expect(state.customers).toEqual([]);
      expect(state.selectedCustomerId).toEqual(id);
    });
  });

  describe('DELETE_CUSTOMER_SUCCESS action', () => {
    it('should remove the customer from the store', () => {
      const { initialState } = fromCustomers;
      const previousState = { ...initialState, customers: customerMockData };
      const id = customerMockData[1].id;
      const action = new fromActions.DeleteCustomerSuccess(id);
      const state = fromCustomers.reducer(previousState, action);

      expect(state.loading).toEqual(false);
      expect(state.customers.length).toEqual(2);
      expect(state.customers).toEqual([
        customerMockData[0],
        customerMockData[2]
      ]);
    });
  });
});
```
