import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserFacade } from '@store/user/user.facade';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  updateDataEmits$ = new Subject();
  updateFormEmits$ = new Subject();

  canUpdateData$ = new BehaviorSubject(false);

  isLogin$: Observable<boolean> = this.user.isLogin$;

  constructor(
    private user: UserFacade,
    private router: Router
  ) {
  }

  emitData() {
    this.updateDataEmits$.next();
  }

  emitForm() {
    this.updateFormEmits$.next();
  }

  toggleDataAvailability(value: boolean) {
    this.canUpdateData$.next(value);
  }

  logOut() {
    this.user.logout().pipe(
      tap(() => {
        this.router.navigate(['login']);
      })
    ).subscribe();
  }
}
