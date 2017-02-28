import {
  Component,
  ElementRef,
  ViewChild,
  Input,
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

  get value() {
    return this._value;
  }
  set value(value: boolean) {
    this._value = value;
    this.render();
    this.onChangeCallback(this._value);
  }

  @Input() private _value: boolean = null;
  @ViewChild('checkbox') private _checkbox: ElementRef;

  public writeValue(value: any): void {
    if (value !== undefined) {
      this.value = value;
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
      this._checkbox.nativeElement.checked = this._checkbox.nativeElement.readOnly = this.value = false;
    } else if (!this._checkbox.nativeElement.checked) {
      this._checkbox.nativeElement.readOnly = this._checkbox.nativeElement.indeterminate = true;
      this.value = null;
    } else {
      this.value = true;
    }
  }

  private onChangeCallback = (_: any) => { }
  private onTouchedCallback = () => { }

  private render(): void {
    switch(this.value) {
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
