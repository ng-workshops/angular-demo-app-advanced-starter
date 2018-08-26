# 9 Component - Projection

## home/info-box/info-box.component.html
```html
<div style="border: 1px dotted royalblue">
  <ng-content select="[header]"></ng-content>
  <p>@Input() Message: {{message}}</p>
  <p>@Input() Name: {{name}}</p>

  <p>
    <input type="text" #text/>
    <button (click)="reply(text.value)">Message to parent</button>
  </p>
  <ng-content select="footer"></ng-content>
</div>
```

## home/home.component.html

```html
<p>
  <button (click)="changeChild()">Change Child data</button>
  <button (click)="child.name = 'Changed BY PARENT'">Change Child via Template Var</button>
  <button (click)="processReplyFromCode()">Change Child via ViewChild</button>
  <button (click)="sendMessage()">Send message via service</button>
</p>

<info-box #child [message]="message" [name]="name" (replyToParent)="processReply($event)">
  <footer>I am the footer</footer>
  <div header>I am the header</div>
</info-box>

<pre>Message from Child = {{ reply | json }}</pre>
```
