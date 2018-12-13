import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../material-module';
import { RegistrationRoutingModule } from './registration-routing.module';
import {RegisterComponent} from './register.component';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
      MaterialModule,
    RegistrationRoutingModule
  ]
})
export class RegistrationModule { }
