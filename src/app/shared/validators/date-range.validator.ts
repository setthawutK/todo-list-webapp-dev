import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateRangeRequired(control: AbstractControl): ValidationErrors | null {
  const value = control.value;

  if (Array.isArray(value) && value[0] && value[1]) return null;
  return { required: true };
}
