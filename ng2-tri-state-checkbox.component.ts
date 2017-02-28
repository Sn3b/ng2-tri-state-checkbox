import {
  Component,
  ElementRef,
  ViewChild,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ng2-tri-state-checkbox',
  template: `<input #checkbox type="checkbox" (change)="onChange()" (click)="setState()" />`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => Ng2TriStateCheckboxComponent),
      multi: true
    }
  ]
})
export class Ng2TriStateCheckboxComponent implements ControlValueAccessor {

  get checked() {
    return this._checked;
  }
  set checked(checked: boolean) {
    this._checked = checked;
    this.render();
    this.onChangeCallback(this._checked);
  }

  @ViewChild('checkbox') private _checkbox: ElementRef;
  private _checked: boolean = null;

  public writeValue(value: any): void {
    if (value !== undefined) {
      this.checked = value;
    }
  }

  public registerOnChange(fn: (_: any) => void): void {
    this.onChangeCallback = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  public onChange(): void {
    this.onTouchedCallback();
  }

  public setState(): void {
    if (this._checkbox.nativeElement.readOnly) {
      this._checkbox.nativeElement.checked = this._checkbox.nativeElement.readOnly = this.checked = false;
    } else if (!this._checkbox.nativeElement.checked) {
      this._checkbox.nativeElement.readOnly = this._checkbox.nativeElement.indeterminate = true;
      this.checked = null;
    } else {
      this.checked = true;
    }
  }

  private onChangeCallback = (_: any) => { }
  private onTouchedCallback = () => { }

  private render(): void {
    switch(this.checked) {
      case true:
        this._checkbox.nativeElement.readOnly = this._checkbox.nativeElement.indeterminate = false;
        this._checkbox.nativeElement.checked = true;
        break;
      case false:
        this._checkbox.nativeElement.checked = this._checkbox.nativeElement.readOnly = this._checkbox.nativeElement.indeterminate = false;
        break;
      case null:
      case undefined:
      default:
        this._checkbox.nativeElement.readOnly = this._checkbox.nativeElement.indeterminate = true;
        break;
    }
  }
}
