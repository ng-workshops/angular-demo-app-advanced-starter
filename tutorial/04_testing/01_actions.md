# 1 testing - actions

$ touch customers/store/actions/customer.actions.spec.ts

## customers/store/actions/customer.actions.spec.ts

```ts
import * as fromCustomers from './customer.actions';

const customerMockData = require('../../../../../server/mocks/customers/customers.json');

describe('Customer actions', () => {
  describe('LoadCustomers Actions', () => {
    describe('LoadCustomers', () => {
      it('should create a anction', () => {
        const actual = new fromCustomers.LoadCustomers();
        const expected = {
          type: fromCustomers.CustomerActionTypes.LoadCustomers
        };

        expect(actual.type).toEqual(expected.type);
      });
    });

    describe('LoadCustomersSuccess', () => {
      it('should create a anction', () => {
        const payload = customerMockData;
        const actual = new fromCustomers.LoadCustomersSuccess(payload);
        const expected = {
          type: fromCustomers.CustomerActionTypes.LoadCustomersSuccess,
          payload
        };

        // expect({ ...actual }).toEqual({ ...expected });
        expect(actual.type).toEqual(expected.type);
      });
    });

    describe('LoadCustomersFail', () => {
      it('should create a anction', () => {
        const payload = { message: 'Load Error' };
        const actual = new fromCustomers.LoadCustomersFail(payload);
        const expected = {
          type: fromCustomers.CustomerActionTypes.LoadCustomersFail,
          payload
        };

        // expect({ ...actual }).toEqual({ ...expected });
        expect(actual.type).toEqual(expected.type);
      });
    });
  });
});
```
