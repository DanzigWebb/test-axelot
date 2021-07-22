import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from '@components/header/header.service';
import { Observable, of, Subject } from 'rxjs';
import { catchError, filter, switchMap, takeUntil, tap } from 'rxjs/operators';
import { DialogsService } from '@components/dialogs/dialogs.service';
import { MatDialog } from '@angular/material/dialog';
import { Form } from '@models/form.model';
import { IFormData, IFormDataItem } from '@models/models.interface';
import { FormFacade } from '@src/app/store/form/form.facade';
import { FormStateModel } from '@src/app/store/form/form.state';
import { FormPageDialogComponent } from '@pages/form-page/form-page-dialog/form-page-dialog.component';
import { Control } from '@models/control.model';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit, OnDestroy {

  public controls: Record<string, Control> = {};

  public state$: Observable<FormStateModel> = this.formFacade.state$.pipe(
    filter(s => !!s.form),
    tap((form) => {
      this.controls = this.cloneControls(form.controls);
    })
  );

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

  private cloneControls = (controls: Record<string, Control>): Record<string, Control> => (
    Object.keys(controls).reduce(
      (acc, key) => (acc[key] = {...controls[key]}) && acc, {} as Record<string, Control>
    )
  );

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

  showData(): void {
    const data = this.parseFormData();
    this.dialog.open(FormPageDialogComponent, {data});
  }

  private parseFormData(): IFormData {
    const items = Object.keys(this.controls)
      .filter((key) => !!this.controls[key])
      .reduce((acc, key) => {
        const ID = key;
        const value = this.controls[key].value;
        return [...acc, {ID, value}];
      }, [] as IFormDataItem<any>[]);

    return {items};
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
