import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserFacade } from '@store/user/user.facade';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  updateDataEmits$ = new Subject();
  updateFormEmits$ = new Subject();

  canUpdateData$ = new BehaviorSubject(false);

  isLogin$: Observable<boolean> = this.user.isLogin$

  constructor(
    private user: UserFacade
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
}
