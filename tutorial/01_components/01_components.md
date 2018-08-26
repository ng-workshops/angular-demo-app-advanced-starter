# 1 Component interaction - Parent to Child

$ ng generate component home/info-box --module home

## home/info-box/info-box.component.html

```html
<div style="border: 1px dotted royalblue">
  <p>@Input() Message: {{message}}</p>
</div>
```

## home/info-box/info-box.component.ts

```ts
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'info-box',
  templateUrl: './info-box.component.html',
  styleUrls: ['./info-box.component.scss']
})
export class InfoBoxComponent implements OnInit {
  @Input()
  message: string;

  constructor() {}

  ngOnInit() {}
}
```

## home/home.component.html

```html
<p>
  <button (click)="changeChild()">Change Child data</button>
</p>

<info-box [message]="message"></info-box>
```

## home/home.component.ts

```ts
export class HomeComponent {
  message = 'INIT';

  changeChild() {
    this.message = new Date().toISOString();
  }
}
```
