import { NavigationExtras } from '@angular/router';
import { createAction, props } from '@ngrx/store';

export const navigate = createAction(
  '[Router] Navigate',
  props<{ path: any[]; query?: object; extras?: NavigationExtras }>()
);
export const back = createAction('[Router] Back');
export const forward = createAction('[Router] Forward');
