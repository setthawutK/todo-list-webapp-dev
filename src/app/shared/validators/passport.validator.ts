import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passportValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const isValidPassport = /^[A-Z]{2}[0-9]{7}$/.test(value);

  return isValidPassport ? null : { isValidPassport: true };
}
