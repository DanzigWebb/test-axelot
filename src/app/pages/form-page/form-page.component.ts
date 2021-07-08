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

  controls: { [key: string]: any } = {};

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
        if (data) {
          this.resetForm();
          data.items.forEach(item => {
            this.controls[item.ID] = item.value;
          });
        }
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
    const createControls = (form: IForm) => {
      form.columns.forEach(c => {
        c.inputs.forEach(input => {
          const {ID} = input;
          this.controls[ID] = '';
        });
      });
    };

    return this.api.getForm().pipe(
      tap((form) => {
        createControls(form);
        this.form = form || undefined;
      }),
      catchError(() => of(undefined))
    );
  }

  resetForm() {
    Object.keys(this.controls).forEach(key => {
      this.controls[key] = null;
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
