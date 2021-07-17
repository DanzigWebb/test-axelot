import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from '@components/header/header.service';
import { Observable, of, Subject } from 'rxjs';
import { catchError, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ApiService } from '@services/api.service';
import { DialogsService } from '@components/dialogs/dialogs.service';
import { MatDialog } from '@angular/material/dialog';
import { FormPageDialogComponent } from '@pages/form-page/form-page-dialog/form-page-dialog.component';
import { Form } from '@models/form.model';
import { IFormData } from '@models/models.interface';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit, OnDestroy {

  form: Form | undefined;

  private unsubscribe$ = new Subject();

  constructor(
    private headerService: HeaderService,
    private api: ApiService,
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
    return this.api.getData().pipe(
      tap((data) => {
        data && this.form?.updateData(data);
      }),
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
    return this.api.getForm().pipe(
      tap(form => {
        this.form = form;
      }),
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
    this.dialog.open(FormPageDialogComponent, {
      data: this.form?.getData()
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
