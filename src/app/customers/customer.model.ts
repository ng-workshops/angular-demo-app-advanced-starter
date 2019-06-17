import { FormBuilder, Validators } from '@angular/forms';

export class Customer {
  id: number;
  name: string;
  numberOfOrders = 0;

  firstname?: string;
  hobbies?: string[];

  static toFormGroup(customer = new Customer()) {
    const formBuilder = new FormBuilder();

    return formBuilder.group({
      id: formBuilder.control(customer.id),
      name: formBuilder.control(customer.name, Validators.required),
      firstname: formBuilder.control(customer.firstname),
      numberOfOrders: formBuilder.control(
        customer.numberOfOrders,
        Validators.min(0)
      )
    });
  }
}
