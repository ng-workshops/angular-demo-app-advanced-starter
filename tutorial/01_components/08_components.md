# 8 Component - 2 way binding

$ ng generate component home/info-item --module home

## home/info-item/info-item.component.html
```html
<p>
  <input type="text" [(ngModel)]="message" />
</p>
```

## home/info-item/info-item.component.ts

```ts
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'info-item',
  templateUrl: './info-item.component.html',
  styleUrls: ['./info-item.component.scss']
})
export class InfoItemComponent implements OnInit {
  private _messageValue: string;

  @Output()
  messageChange = new EventEmitter<string>();

  @Input()
  get message() {
    return this._messageValue;
  }

  set message(val) {
    this._messageValue = val;
    this.messageChange.emit(this._messageValue);
  }

  constructor() {}

  ngOnInit() {}
}
```

## home/home.component.html

```html
<p>
  <info-item [(message)]="name"></info-item>
  <pre>name = {{ name | json }}</pre>
</p>
```

## home/home.component.ts

```ts
import { Component, ViewChild } from '@angular/core';
import { InfoBoxComponent } from './info-box/info-box.component';
import { MessageService } from './message.service';

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  message = 'INIT';
  name = 'START_';
  reply = '';

  @ViewChild('child')
  private child: InfoBoxComponent;

  constructor(private messageService: MessageService) {}

  changeChild() {
    this.message = new Date().toISOString();
    this.name += 'X';
  }

  processReply(event) {
    this.reply = event;
  }

  processReplyFromCode() {
    this.child.reply('Send from parent via CODE');
  }

  sendMessage() {
    this.messageService.sendMessage('Send from parent via service');
  }
}
```

## home/home.module.ts

```ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { InfoBoxComponent } from './info-box/info-box.component';
import { InfoItemComponent } from './info-item/info-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule
  ],
  declarations: [HomeComponent, InfoBoxComponent, InfoItemComponent],
})
export class HomeModule { }
```