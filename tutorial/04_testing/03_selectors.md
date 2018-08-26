# 3 testing - selectors

$ touch customers/store/selectors/customer.selectors.spec.ts

## customers/store/selectors/customer.selectors.spec.ts

```ts
import * as fromReducers from '../reducers/customer.reducer';
import * as fromSelectors from './customer.selectors';

describe('Customer Selectors', () => {
  const customerMockData = require('../../../../../server/mocks/customers/customers.json');

  describe('getLoading', () => {
    it('should return the loading state from the store', () => {
      const { initialState } = fromReducers;
      const actual = fromSelectors.getLoading({ customer: initialState });

      expect(actual).toBeFalsy();
    });
  });

  describe('getCustomers', () => {
    it('should return the customers from the store', () => {
      const { initialState } = fromReducers;
      const state = {
        customer: {
          ...initialState,
          customers: customerMockData
        }
      };
      const actual = fromSelectors.getCustomers(state);

      expect(actual).toEqual(customerMockData);
    });
  });

  describe('getSelectedCustomer', () => {
    it('should return the customers from the store', () => {
      const { initialState } = fromReducers;
      const state = {
        customer: {
          ...initialState,
          customers: customerMockData,
          selectedCustomerId: customerMockData[1].id
        }
      };

      const actual = fromSelectors.getSelectedCustomer(state);

      expect(actual).toEqual(customerMockData[1]);
    });
  });
});
```
