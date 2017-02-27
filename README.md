# ng2-tri-state-checkbox
A simple checkbox with indeterminate state to be used in Angular2 projects.

### Usage:

```html
<form [formGroup]="myForm">
  <ng2-tri-state-checkbox formControlName="myControl"></ng2-tri-state-checkbox>
</form>
```

```typescript
this.myForm = new FormGroup({
  myControl: new FormControl(null)
});
```
