import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { Customer } from '../customer.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  @HostBinding('class.customers') hostStyle = true;

  @Input() customer: Customer;

  @Output() deleteCustomer = new EventEmitter<number>();

  showDetails = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  delete(id: number) {
    this.deleteCustomer.emit(id);
  }

  edit() {
    this.router.navigate(['customers', this.customer.id]);
  }

  showMore() {
    this.showDetails = !this.showDetails;
  }
}
