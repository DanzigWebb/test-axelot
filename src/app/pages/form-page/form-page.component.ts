import { Component, OnDestroy, OnInit } from '@angular/core';
import { HeaderService } from '@components/header/header.service';
import { Observable, of, Subject } from 'rxjs';
import { catchError, switchMap, takeUntil, tap } from 'rxjs/operators';
import { ApiService } from '@services/api.service';
import { IForm, IFormData } from '@models/models';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.scss']
})
export class FormPageComponent implements OnInit, OnDestroy {

  data: IFormData | undefined;
  form: IForm | undefined;

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
        this.data = data || undefined;
      }),
      catchError(() => of(undefined))
    );
  }

  awaitForm() {
    return this.headerService.updateFormEmits$.pipe(
      switchMap(() => this.getForm())
    );
  }

  getForm(): Observable<IForm | undefined> {
    return this.api.getForm().pipe(
      tap((form) => {
        this.form = form || undefined;
      }),
      catchError(() => of(undefined))
    );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
