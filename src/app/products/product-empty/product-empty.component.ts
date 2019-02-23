import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-empty',
  template: `
    <p>Nothing to see here...</p>
  `,
  styles: ['p { color: grey; margin: 10px; }']
})
export class ProductEmptyComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
