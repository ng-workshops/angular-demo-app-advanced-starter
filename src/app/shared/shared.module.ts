import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatRadioModule,
  MatSnackBarModule,
  MatInputModule,
  MatIconModule
} from '@angular/material';

import { CanClickDirective } from './directives/can-click.directive';
import { JoinPipe } from './pipes/join.pipe';
import { InputIntegerComponent } from './input-integer/input-integer.component';
import { IntegerValidatorDirective } from './input-integer/integer.validator.directive';

@NgModule({
  imports: [CommonModule, MatInputModule, FormsModule],
  declarations: [
    CanClickDirective,
    InputIntegerComponent,
    IntegerValidatorDirective,
    JoinPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputIntegerComponent,
    IntegerValidatorDirective,
    JoinPipe,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    CanClickDirective
  ],
  providers: []
})
export class SharedModule {}
