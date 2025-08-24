import { AbstractControl, ValidationErrors } from '@angular/forms';

export function otpValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  const isValidOtp = /^[0-9]{6}$/.test(value);

  return isValidOtp ? null : { isValidOtp: true };
}
