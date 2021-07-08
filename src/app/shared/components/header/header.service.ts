import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  updateDataEmits$ = new Subject();
  updateFormEmits$ = new Subject();

  emitData() {
    this.updateDataEmits$.next();
  }

  emitForm() {
    this.updateFormEmits$.next();
  }
}
