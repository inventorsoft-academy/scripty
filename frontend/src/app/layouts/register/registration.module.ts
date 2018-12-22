import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../material-module';
import { RegistrationRoutingModule } from './registration-routing.module';
import {RegisterComponent} from './register.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RegistrationRoutingModule,
    ReactiveFormsModule
  ]
})
export class RegistrationModule { }
