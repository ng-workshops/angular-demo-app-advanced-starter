import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '../customer.model';
import { switchMap, filter } from 'rxjs/operators';
import { CustomerService } from '../customer.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.form = Customer.toFormGroup();

    this.route.paramMap
      .pipe(
        filter(params => params.get('id') !== 'new'),
        switchMap(params => this.customerService.getById(params.get('id')))
      )
      .subscribe(customer => {
        this.form.patchValue(customer);
      });
  }

  submit() {
    const data = this.form.getRawValue();
    const save$ = data.id
      ? this.customerService.update.bind(this.customerService) :
      this.customerService.create.bind(this.customerService);

    save$(data)
      .subscribe(_ => {
        this.snackBar.open(`Customer ${data.name} saved successfully.`, '', { duration: 2000 });
        this.cancel();
      });
  }

  cancel() {
    this.router.navigate(['customers']);
  }
}
