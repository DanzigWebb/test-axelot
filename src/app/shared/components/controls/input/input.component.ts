import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { Control } from '@models/control.model';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputComponent),
    multi: true
  }]
})
export class InputComponent implements OnInit, ControlValueAccessor {

  @Input() control: Control | undefined;

  @Input() set disabled(isDisable) {
    this._disabled = isDisable;
    isDisable
      ? this.input.disable()
      : this.input.enable();
  }

  get disabled() {
    return this._disabled;
  }

  private _disabled = false;

  public input = new FormControl();

  constructor() {
  }

  ngOnInit(): void {
    this.input.valueChanges.subscribe(v => {
      this.onChange(v);
    });
  }

  onChange(_: any) {
  }

  writeValue(value: any) {
    this.input.setValue(value);
  }

  registerOnChange(fn: (_: any) => void) {
    this.onChange = fn;
  }

  registerOnTouched() {
  }
}
