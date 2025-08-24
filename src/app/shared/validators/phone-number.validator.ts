import { AbstractControl, ValidationErrors } from '@angular/forms';

export function phoneNumberValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const isValidPhoneNumber = /^[0-9]{10}$/.test(value);

  return isValidPhoneNumber ? null : { invalidPhoneNumber: true };
}
