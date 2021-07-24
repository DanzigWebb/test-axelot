import { Component, OnInit } from '@angular/core';
import { IUserLoginData } from '@models/user.interface';
import { UserFacade } from '@store/user/user.facade';
import { NgForm } from '@angular/forms';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  public formData: IUserLoginData = {
    name: '',
    password: ''
  };

  constructor(
    private user: UserFacade,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  login(f: NgForm) {
    if (f.valid) {
      this.user.login(this.formData).pipe(
        tap(() => this.router.navigate([''])),
        catchError((err) => LoginPageComponent.handleError(err, f))
      ).subscribe();
    }
  }

  private static handleError(error: HttpErrorResponse, f: NgForm): Observable<never> {
    f.form.get('name')?.setErrors({invalidLogin: true});
    return throwError(error);
  }
}
