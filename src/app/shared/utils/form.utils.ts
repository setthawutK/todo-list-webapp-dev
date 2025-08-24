import { AbstractControl, FormGroup } from '@angular/forms';

export function isValidForm(form: FormGroup): boolean {
  return form.valid;
}

export function isInvalidControl(control: AbstractControl): boolean {
  return control.invalid && (control.dirty || control.touched);
}
