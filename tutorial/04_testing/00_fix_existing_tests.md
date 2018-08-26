# 0 Testing - Fix existing tests

## app.component.ts

```ts
providers: [
SettingsService,
{ provide: HttpClient, useValue: {} },
HostElementService
],
```

## shared/modal/modal.service.spec.ts

```ts
beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [ModalService, HostElementService]
  });
});
```

## shared/modal/modal.component.spec.ts

```ts
beforeEach(async(() => {
  TestBed.configureTestingModule({
    imports: [MatCardModule, MatButtonModule, NoopAnimationsModule],
    declarations: [ModalComponent]
  }).compileComponents();
}));

beforeEach(() => {
  fixture = TestBed.createComponent(ModalComponent);
  component = fixture.componentInstance;
  component.modal = { title: 'test', message: 'tester', type: 'primary' };
  fixture.detectChanges();
});
```

## home/home.component.spec.ts

```ts
beforeEach(async(() => {
  TestBed.configureTestingModule({
    imports: [FormsModule],
    declarations: [HomeComponent, InfoBoxComponent, InfoItemComponent],
    providers: [MessageService, HostElementService, ModalService]
  }).compileComponents();
}));
```

## home/info-item/info-item.component.spec.ts

```ts
beforeEach(async(() => {
  TestBed.configureTestingModule({
    imports: [FormsModule],
    declarations: [InfoItemComponent]
  }).compileComponents();
}));
```

## customers/customer-list/customer-list.component.spec.ts

```ts
beforeEach(async(() => {
  // const spy = jasmine.createSpyObj('CustomerService', ['getAll']);
  const spy = { getAll: () => of([]) };
  let store: Store<CustomerState>;

  TestBed.configureTestingModule({
    imports: [
      StoreModule.forRoot({
        customer: reducer
      })
    ],
    declarations: [CustomerListComponent],
    providers: [
      { provide: Router, useValue: {} },
      { provide: CustomerService, useValue: spy }
    ],
    schemas: [NO_ERRORS_SCHEMA]
  }).compileComponents();

  customerServiceSpy = TestBed.get(CustomerService);
  store = TestBed.get(Store);
  spyOn(store, 'dispatch').and.callThrough();
}));
```

## customers/customer-form/customer-form.component.spec.ts

```ts
beforeEach(async(() => {
  const activeRouteDataListener = new Subject();
  const activeRouteParamMapListener = new Subject();
  const activeRouteStub = {
    data: activeRouteDataListener,
    paramMap: activeRouteParamMapListener,
    snapshot: {
      params: {
        id: '10'
      }
    }
  };
  let store: Store<CustomerState>;

  TestBed.configureTestingModule({
    imports: [
      StoreModule.forRoot({
        customer: reducer
      })
    ],
    declarations: [CustomerFormComponent],
    providers: [
      { provide: ActivatedRoute, useValue: activeRouteStub },
      { provide: Router, useValue: {} },
      { provide: CustomerService, useValue: {} },
      { provide: MatSnackBar, useValue: {} }
    ],
    schemas: [NO_ERRORS_SCHEMA]
  }).compileComponents();

  store = TestBed.get(Store);
  spyOn(store, 'dispatch').and.callThrough();
}));
```
