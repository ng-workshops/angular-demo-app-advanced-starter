# 4 testing - effects

## customers/store/effects/customer.effects.spec.ts

```ts
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { ReplaySubject, of } from 'rxjs';
import { CustomerEffects } from './customer.effects';
import { CustomerService } from '../../customer.service';
import { MatSnackBarModule } from '@angular/material';
import {
  LoadCustomers,
  LoadCustomersSuccess,
  SearchCustomer
} from '../actions/customer.actions';
const customerMockData = require('../../../../../server/mocks/customers/customers.json');

const CustomerServiceStub = {
  getAll: () => of(customerMockData)
};

describe('CustomerEffects', () => {
  let actions$: ReplaySubject<any>;
  let effects: CustomerEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [
        CustomerEffects,
        provideMockActions(() => actions$),
        {
          provide: CustomerService,
          useValue: CustomerServiceStub
        },
        ModalService,
        HostElementService
      ]
    });

    spyOn(CustomerServiceStub, 'getAll').and.callThrough();

    effects = TestBed.get(CustomerEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  describe('GIVEN the customers are loaded', () => {
    describe('WHEN there is no search value', () => {
      it('THEN the LoadCustomersSuccess action should be returned with customers', done => {
        actions$ = new ReplaySubject(1);
        actions$.next(new LoadCustomers());
        effects.loadCustomers$.subscribe(result => {
          expect(result).toEqual(new LoadCustomersSuccess(customerMockData));
          expect(CustomerServiceStub.getAll).toHaveBeenCalledWith(undefined);
          done();
        });
      });
    });

    describe('WHEN there is a search value', () => {
      it('THEN the LoadCustomersSuccess action should be returned with customers', done => {
        actions$ = new ReplaySubject(1);
        actions$.next(new SearchCustomer('simpson'));
        effects.loadCustomers$.subscribe(result => {
          expect(result).toEqual(new LoadCustomersSuccess(customerMockData));
          expect(CustomerServiceStub.getAll).toHaveBeenCalledWith('simpson');
          done();
        });
      });
    });
  });
});
```
