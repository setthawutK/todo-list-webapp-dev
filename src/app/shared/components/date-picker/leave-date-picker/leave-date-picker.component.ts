import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ErrorHandlerUtils } from '@shared/error/error-handler-utils';
import { LeaveHolidaysService } from '@shared/services/date/leave-holidays.service';
import { NotificationService } from '@shared/services/notification';
import { HolidayResDto } from '@shared/swagger/i-leave.ts';
import { DatePicker } from 'primeng/datepicker';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'app-leave-date-picker',
  imports: [DatePicker, NgClass, Tooltip, FormsModule, ReactiveFormsModule],
  templateUrl: './leave-date-picker.component.html',
  styleUrl: './leave-date-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: LeaveDatePickerComponent,
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeaveDatePickerComponent implements OnInit, ControlValueAccessor {
  private readonly _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private readonly _leaveHolidays: LeaveHolidaysService = inject(LeaveHolidaysService);
  private readonly _notify: NotificationService = inject(NotificationService);

  @Input() required: boolean = false;

  minDate = new Date(new Date().getFullYear(), 0, 1);
  maxDate = new Date(new Date().getFullYear(), 11, 31);
  holidays: Date[] = [];
  holidaysList: HolidayResDto[] = [];

  formControl!: FormControl;
  onChange: (value: Date[] | null) => void = () => {};
  onTouched: () => void = () => {};

  constructor() {
    this.getHolidays();
  }

  ngOnInit(): void {
    const validators: ValidatorFn[] = [];
    if (this.required) validators.push(Validators.required);
    this.formControl = new FormControl('', validators);
  }

  isHoliday(date: PrimeNgCalendarDate): boolean {
    return this.holidays!.some(h => h.getDate() === date.day && h.getMonth() === date.month && h.getFullYear() === date.year);
  }

  getInfoHolidays(date: PrimeNgCalendarDate): string {
    if (!date) return '';
    const targetDate = `${date.year}-${String(date.month + 1).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
    const holiday = this.holidaysList.find(h => h.date === targetDate);
    return holiday?.name || '';
  }

  getHolidays() {
    this._notify.startSpinner();
    const thisYear = new Date().getFullYear();
    this._leaveHolidays.getHolidays(thisYear).subscribe({
      next: res => {
        this.holidays = res?.data?.map(h => new Date(h.date!)) ?? [];
        this.holidaysList = res.data!;
        this._cdr.markForCheck();
        this._notify.stopSpinner();
      },
      error: err => {
        this._notify.showError(ErrorHandlerUtils.getMsg(err), 'Error');
        this._notify.stopSpinner();
      },
    });
  }

  //function ControlValueAccessor
  writeValue(value: Date[] | null): void {
    this.formControl.setValue(value);
  }

  registerOnChange(fn: (value: Date[] | null) => void): void {
    this.onChange = fn;
    this.formControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}

interface PrimeNgCalendarDate {
  day: number;
  month: number;
  year: number;
  otherMonth?: boolean;
  today?: boolean;
  selectable?: boolean;
}
