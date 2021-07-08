import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPageDialogComponent } from './form-page-dialog.component';

describe('FormPageDialogComponent', () => {
  let component: FormPageDialogComponent;
  let fixture: ComponentFixture<FormPageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPageDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
