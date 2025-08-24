import { AbstractControl, ValidationErrors } from '@angular/forms';

export function emailValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

  return isValidEmail ? null : { isValidEmail: true };
}
