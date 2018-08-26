# 10 ngrx - Sync with local storage

## app/store/index.ts

```ts
import { localStorageSync } from 'ngrx-store-localstorage';

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [performanceLogger, storeFreeze, localStorageSyncReducer]
  : [localStorageSyncReducer];

function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({ keys: ['customer'] })(reducer);
}
```
