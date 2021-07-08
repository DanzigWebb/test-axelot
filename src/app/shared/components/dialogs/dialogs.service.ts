import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogErrorComponent } from '@components/dialogs/dialog-error/dialog-error.component';

@Injectable({
  providedIn: 'root'
})
export class DialogsService {

  constructor(
    private dialog: MatDialog
  ) {
  }

  showError(config: MatDialogConfig = {}) {
    return this.dialog.open(DialogErrorComponent, config);
  }
}
