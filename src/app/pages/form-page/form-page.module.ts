import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormPageRoutingModule } from './form-page-routing.module';
import { FormPageComponent } from './form-page.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { FormPageDialogComponent } from './form-page-dialog/form-page-dialog.component';
import { InputModule } from '@components/controls/input/input.module';


@NgModule({
  declarations: [
    FormPageComponent,
    FormPageDialogComponent
  ],
  imports: [
    CommonModule,
    FormPageRoutingModule,
    SharedModule,
    FormsModule,
    InputModule
  ]
})
export class FormPageModule { }
