import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IFormData } from '@models/models';

@Component({
  selector: 'app-form-page-dialog',
  templateUrl: './form-page-dialog.component.html',
  styleUrls: ['./form-page-dialog.component.scss']
})
export class FormPageDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IFormData
  ) {
    console.log(data);
  }

  ngOnInit(): void {
  }

}
