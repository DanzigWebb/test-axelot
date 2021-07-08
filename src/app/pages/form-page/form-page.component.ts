import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from '@components/header/header.service';
import { Observable, of, Subject } from 'rxjs';
import { catchError, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ApiService } from '@services/api.service';
import { IFormData } from '@models/models';
import { Form } from '@models/form';

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
    private api: ApiService
  ) {
  }

  ngOnInit(): void {
    this.awaitData()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();

    this.awaitForm()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe();
  }

  awaitData() {
    return this.headerService.updateDataEmits$.pipe(
      switchMap(() => this.getData())
    );
  }

  getData(): Observable<IFormData | undefined> {
    return this.api.getData().pipe(
      tap((data) => {
        data && this.form?.updateData(data);
      }),
      catchError(() => of(undefined))
    );
  }

  awaitForm() {
    return this.headerService.updateFormEmits$.pipe(
      switchMap(() => this.getForm())
    );
  }

  getForm(): Observable<Form | undefined> {
    return this.api.getForm().pipe(
      tap(form => {
        this.form = form;
      }),
      catchError(() => of(undefined))
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
