import { HostBinding, Input } from '@angular/core';

export abstract class E2EHostComponent {
  @HostBinding('attr.data-e2e') attr_e2e: string;

  @Input()
  set name(name: string) {
    this._name = name;
    this.attr_e2e += '_' + this._name;
  }

  get name(): string {
    return this._name;
  }

  private _name: string;
}
