import { AbstractControl, ValidationErrors } from '@angular/forms';

export function idCardValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (value?.length === 13) {
    let sum = 0;
    for (let i = 0; i < 12; i++) sum += +value[i] * (13 - i);
    const lastDigit = (11 - (sum % 11)) % 10;

    if (lastDigit != value[12]) {
      return { checksum: false };
    } else {
      return null;
    }
  } else if (value?.length !== 13) {
    return { idCardLength: false };
  } else {
    return { uncaughtError: true };
  }
}
