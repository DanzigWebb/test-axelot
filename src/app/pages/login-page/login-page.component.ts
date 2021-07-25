import { Component, OnDestroy, OnInit } from '@angular/core';
import { IUserLoginData } from '@models/user.interface';
import { UserFacade } from '@store/user/user.facade';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { DialogsService } from '@components/dialogs/dialogs.service';

enum LoginValidatorsEnum {
  name = 'invalidLogin'
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form!: FormGroup;

  get nameInput() {
    return this.form.get('name');
  }

  get invalidError() {
    return this.nameInput?.errors?.[LoginValidatorsEnum.name];
  }

  private unsubscribe$ = new Subject();

  constructor(
    private user: UserFacade,
    private router: Router,
    private fb: FormBuilder,
    private dialogs: DialogsService
  ) {
  }

  ngOnInit(): void {
    this.initForm();
    this.clearNameValidator();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  private clearNameValidator() {
    this.form.valueChanges.pipe(
      tap(() => this.resetInvalidError()),
      takeUntil(this.unsubscribe$)
    ).subscribe();
  }

  login() {
    if (this.form.valid) {
      const data: IUserLoginData = this.createData();
      this.user.login(data).pipe(
        tap(() => this.router.navigate([''])),
        catchError((err) => this.handleError(err))
      ).subscribe();
    }
  }

  private createData(): IUserLoginData {
    const name = this.form.get('name')?.value;
    const password = this.form.get('password')?.value;
    return {name, password};
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.status === 404) {
      this.addInvalidError();
    } else {
      const message = error.message;
      this.showError(message);
    }
    return throwError(error);
  }

  private resetInvalidError() {
    const control = this.form.get('name');
    if (control?.errors?.[LoginValidatorsEnum.name]) {
      const clone = {...control?.errors};
      delete clone[LoginValidatorsEnum.name];
      control?.setErrors(
        Object.keys(clone).length ? clone : null
      );
    }
  }

  private addInvalidError() {
    this.form.get('name')?.setErrors({[LoginValidatorsEnum.name]: true});
  }

  private showError(message: string) {
    return this.dialogs.showError({data: message});
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
