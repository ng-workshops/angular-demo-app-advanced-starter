import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { getInt } from '../utils/utils';

@Component({
  selector: 'app-input-integer',
  templateUrl: './input-integer.component.html',
  styleUrls: ['./input-integer.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputIntegerComponent)
    }
  ]
})
export class InputIntegerComponent implements ControlValueAccessor {
  input = '';

  _value: any;
  _onChangeCallback: (value: any) => void;
  _onTouchedCallback: () => void;

  @Input()
  name: string;

  @Input()
  placeholder: string;

  @Output()
  valueChange = new EventEmitter<any>();

  @Input()
  set value(v: any) {
    // update value when new value is different
    // OR when both values are null (to trigger the _onChangeCallback() for validation)
    if (v !== this._value || (v === null && this._value === null)) {
      this._value = v;

      if (this._onChangeCallback) {
        this._onChangeCallback(this._value);
      }
    }
  }

  get value(): any {
    return this._value;
  }

  parseToInt(value: string) {
    // set value which is delegated to form model
    this.value = getInt(value);
  }

  /**
   * Implemented as part of ControlValueAccessor.
   * Gets the value from the form model and sets the input
   *
   * @param {*} value
   *
   * @memberOf UlInputFloatComponent
   */
  writeValue(value: any) {
    this._value = this.parseInt(value);

    // set internal input field value
    this.input = value;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   */
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  /**
   * Implemented as part of ControlValueAccessor.
   */
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  // onKeyDown(event: KeyboardEvent): boolean {
  //   const allowedKeyCodes = [8, 9, 37, 39, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105];

  //   return allowedKeyCodes.findIndex(keyCode => keyCode === event.keyCode) > -1;
  // }

  private parseInt(value: any): any {
    if (value || value === 0) {
      return parseInt(value, 10);
    }

    return null;
  }
}
