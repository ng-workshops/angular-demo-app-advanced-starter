# 5 testing - components

## customers/customer-list/customer-list.component.ts

```ts
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Customer } from '../customer.model';
import { Store } from '@ngrx/store';
import { CustomerState } from '../store/reducers/customer.reducer';
import {
  LoadCustomers,
  DeleteCustomer,
  SearchCustomer
} from '../store/actions/customer.actions';
import {
  getLoading,
  getCustomers
} from '../store/selectors/customer.selectors';
import { Go } from '../../core/router/router.actions';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomerListComponent implements OnInit, OnDestroy {
  customers$: Observable<Customer[]>;
  loading$: Observable<boolean>;
  searchTerm = new FormControl();

  private destroy$ = new Subject();

  constructor(private store: Store<CustomerState>) {}

  ngOnInit() {
    this.searchTerm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe(search => this.store.dispatch(new SearchCustomer(search)));

    // set up selectors
    this.loading$ = this.store.select(getLoading);
    this.customers$ = this.store.select(getCustomers);

    this.store.dispatch(new LoadCustomers());
  }

  ngOnDestroy() {
    this.destroy$.next();
  }

  addNewCustomer() {
    this.store.dispatch(new Go({ path: ['customers', 'new'] }));
  }

  deleteCustomer(id: number) {
    this.store.dispatch(new DeleteCustomer(id));
  }
}
```

## customers/customer-list/customer-list.component.spec.ts

```ts
import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick
} from '@angular/core/testing';

import { CustomerListComponent } from './customer-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { reducer, CustomerState } from '../store/reducers/customer.reducer';
import { StoreModule, Store } from '@ngrx/store';
import {
  LoadCustomers,
  SearchCustomer
} from '../store/actions/customer.actions';

describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let store: Store<CustomerState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          customer: reducer
        })
      ],
      declarations: [CustomerListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    // customerServiceSpy = TestBed.get(CustomerService);
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('GIVEN the component is initialized', () => {
    it('should load all customers after init', () => {
      expect(component).toBeTruthy();

      const expected = new LoadCustomers();
      expect(store.dispatch).toHaveBeenCalledWith(expected);
    });

    it('should should load new customers when search input changes', fakeAsync(() => {
      expect(component).toBeTruthy();
      expect(component.searchTerm).toBeDefined();

      component.searchTerm.setValue('Simp');
      const expected = new SearchCustomer('Simp');

      tick(500);

      expect(store.dispatch).toHaveBeenCalledWith(expected);
    }));
  });
});
```
