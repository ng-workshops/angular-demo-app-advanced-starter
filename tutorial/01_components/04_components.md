# 4 Component interaction - Child events

## home/info-box/info-box.component.html

```html
<div style="border: 1px dotted royalblue">
  <p>@Input() Message: {{message}}</p>
  <p>@Input() Name: {{name}}</p>

  <p>
    <input type="text" #text/>
    <button (click)="reply(text.value)">Message to parent</button>
  </p>
</div>
```

## home/info-box/info-box.component.ts

```ts
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChange,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit, OnChanges {
  private _name: string;

  @Input()
  message: string;

  @Input()
  set name(value: string) {
    this._name = value.toLowerCase();
  }

  get name(): string {
    return this._name;
  }

  @Output()
  replyToParent = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
    if (changes.message) {
      console.log('changes.message', changes.message.currentValue);
    }

    if (changes.name) {
      console.log('changes.name', changes.name.currentValue);
    }

    if (changes.message && changes.name) {
      console.log('Message AND Name changed');
    }
  }

  reply(message?: string) {
    this.replyToParent.emit(message || 'Message from Child');
  }
}
```

## home/home.component.html

```html
<p>
  <button (click)="changeChild()">Change Child data</button>
</p>

<info-box [message]="message" [name]="name" (replyToParent)="processReply($event)"></info-box>

<pre>Message from Child = {{ reply | json }}</pre>
```

## home/home.component.ts

```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  message = 'INIT';
  name = 'START_';
  reply = '';

  changeChild() {
    this.message = new Date().toISOString();
    this.name += 'X';
  }

  processReply(event) {
    this.reply = event;
  }
}
```
