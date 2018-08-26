import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl } from '@angular/forms';
import { integerValidator } from './integer.validator';

@Directive({
  selector: '[appIntegerValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: IntegerValidatorDirective,
      multi: true
    }
  ]
})
export class IntegerValidatorDirective implements Validator {
  validate(control: AbstractControl): { [key: string]: any } {
    return integerValidator()(control);
  }
}
