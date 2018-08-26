# 9 ngrx - Meta reducers

## app/store/index.ts

```ts
import { storeFreeze } from 'ngrx-store-freeze';
import { performanceLogger } from '../core/router/performance-logger';

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [performanceLogger, storeFreeze]
  : [];
```
