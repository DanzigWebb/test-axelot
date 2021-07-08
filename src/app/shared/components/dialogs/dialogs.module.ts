import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogErrorComponent } from './dialog-error/dialog-error.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    DialogErrorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class DialogsModule { }
