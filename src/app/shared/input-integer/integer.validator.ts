import { ValidatorFn, AbstractControl } from '@angular/forms';
import { isEmpty, INTEGER_REGEX } from '../utils/utils';

export function integerValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const value = control.value;

    if (isEmpty(value)) {
      return null;
    }

    if (!INTEGER_REGEX.test(value)) {
      return { integer: { value, expected: 'integer', actual: typeof value } };
    }

    return null;
  };
}
