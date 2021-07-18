import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { FormState } from '@src/app/store/form/form.state';
import { FormFacade } from '@src/app/store/form/form.facade';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';

@NgModule({
  providers: [FormFacade],
  imports: [
    NgxsModule.forRoot([FormState]),
    NgxsFormPluginModule.forRoot()
  ]
})
export class FormStateModule {
}
