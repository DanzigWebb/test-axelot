import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from '@components/header/header.service';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { DialogsService } from '@components/dialogs/dialogs.service';
import { MatDialog } from '@angular/material/dialog';
import { Form } from '@models/form.model';
import { IFormData, IFormDataItem } from '@models/models.interface';
import { FormFacade } from '@src/app/store/form/form.facade';
import { FormStateModel } from '@src/app/store/form/form.state';
import { FormPageDialogComponent } from '@pages/form-page/form-page-dialog/form-page-dialog.component';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit, OnDestroy {

  public state$: Observable<FormStateModel> = this.formFacade.state$;

  private unsubscribe$ = new Subject();

  constructor(
    private headerService: HeaderService,
    private formFacade: FormFacade,
    private dialog: MatDialog,
    private dialogs: DialogsService
  ) {
  }

  ngOnInit(): void {
    this.awaitData().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe();

    this.awaitForm().pipe(
      tap((form) => this.headerService.toggleDataAvailability(!!form)),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  awaitData(): Observable<IFormData | undefined> {
    return this.headerService.updateDataEmits$.pipe(
      switchMap(() => this.getData())
    );
  }

  getData(): Observable<IFormData | undefined> {
    return this.formFacade.update().pipe(
      catchError(() => {
        this.showError('Не удалось получить данные');
        return of(undefined);
      })
    );
  }

  awaitForm(): Observable<Form | undefined> {
    return this.headerService.updateFormEmits$.pipe(
      switchMap(() => this.getForm())
    );
  }

  getForm(): Observable<Form | undefined> {
    return this.formFacade.fetch().pipe(
      catchError(() => {
        this.showError('Не удалось получить данные');
        return of(undefined);
      })
    );
  }

  showError(message: string) {
    return this.dialogs.showError({
      data: message
    });
  }

  sendData() {
    this.formFacade.controls$.pipe(
      take(1),
      map((controls): IFormData => {
        const items = <IFormDataItem<any>[]>Object.keys(controls).map(key => ({
          ID: key,
          value: controls[key].value
        }));
        return {items};
      }),
      map((data) => this.dialog.open(FormPageDialogComponent, {data}))
    ).subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
