import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatInputModule,
  MatRadioModule,
  MatSnackBarModule,
  MatTableModule
} from '@angular/material';
import { CanClickDirective } from './directives/can-click.directive';
import { InputIntegerComponent } from './input-integer/input-integer.component';
import { IntegerValidatorDirective } from './input-integer/integer.validator.directive';
import { JoinPipe } from './pipes/join.pipe';

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
    MatTableModule,
    CanClickDirective
  ],
  providers: []
})
export class SharedModule {}
