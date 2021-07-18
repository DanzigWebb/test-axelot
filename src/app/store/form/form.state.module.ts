import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { FormState } from '@src/app/store/form/form.state';
import { environment } from '@src/environments/environment';
import { FormFacade } from '@src/app/store/form/form.facade';

@NgModule({
  providers: [FormFacade],
  imports: [
    NgxsModule.forRoot([FormState], {
      developmentMode: !environment.production
    })
  ]
})
export class FormStateModule {
}
