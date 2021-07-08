import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  updateDataEmits$ = new Subject();
  updateFormEmits$ = new Subject();

  canUpdateData$ = new BehaviorSubject(false);

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
