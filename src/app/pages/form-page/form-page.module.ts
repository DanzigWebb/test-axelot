import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormPageRoutingModule } from './form-page-routing.module';
import { FormPageComponent } from './form-page.component';


@NgModule({
  declarations: [
    FormPageComponent
  ],
  imports: [
    CommonModule,
    FormPageRoutingModule
  ]
})
export class FormPageModule { }
