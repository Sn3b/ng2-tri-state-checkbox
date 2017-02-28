# ng2-tri-state-checkbox
A simple checkbox with indeterminate state to be used in Angular2 projects.

[Demo](https://embed.plnkr.co/I7yWlac1yMgbpPjUVbBX/)

### Usage:
#### Model-driven form:

```html
<form [formGroup]="myForm">
  <ng2-tri-state-checkbox formControlName="myControl"></ng2-tri-state-checkbox>
</form>
```

```typescript
this.myForm = new FormGroup({
  myControl: new FormControl(null) // possible values: true / false / null
});
```

#### Template-driven form:

```html
<form #myForm="ngForm">
  <ng2-tri-state-checkbox [(ngModel)]="myModel" name="myControl" #myControl="ngModel"></ng2-tri-state-checkbox>
</form>
```
