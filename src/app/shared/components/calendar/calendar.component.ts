import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Dropdown, DropdownChangeEvent } from 'primeng/dropdown';
import { SelectModule } from 'primeng/select';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [FormsModule, SelectModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  private readonly _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);

  @ViewChild('dateDropdown') dateDropdown?: Dropdown;

  @Input() defalutValue: Date | null | undefined;
  @Input() type: 'vertical' | 'horizontal' = 'horizontal';
  @Input() disabled: boolean = false;
  @Input() numberYear: number = 80;
  @Output() selected = new EventEmitter<Date>();

  readonly dates: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  readonly months: { value: number; name: string }[] = [
    { value: 0, name: 'มกราคม' },
    { value: 1, name: 'กุมภาพันธ์' },
    { value: 2, name: 'มีนาคม' },
    { value: 3, name: 'เมษายน' },
    { value: 4, name: 'พฤษภาคม' },
    { value: 5, name: 'มิถุนายน' },
    { value: 6, name: 'กรกฎาคม' },
    { value: 7, name: 'สิงหาคม' },
    { value: 8, name: 'กันยายน' },
    { value: 9, name: 'ตุลาคม' },
    { value: 10, name: 'พฤศจิกายน' },
    { value: 11, name: 'ธันวาคม' },
  ];

  years: { ad: number; be: number }[] = [];
  valueSelected: null[] | number[] = [null, null, null];
  invalidDate: boolean = false;

  ngOnInit(): void {
    const fullYear = new Date().getFullYear();

    for (let i = 0; i < this.numberYear; i++) this.years.push({ ad: fullYear - i, be: fullYear + 543 - i });
    if (this.defalutValue) this.setDefaultValue();
  }

  onSelect(e: DropdownChangeEvent, index: number) {
    if (index == 0) this.invalidDate = false;

    this.valueSelected[index] = +e.value;

    if (this.valueSelected.every(value => value !== null)) {
      const date = new Date(this.valueSelected[2]!, this.valueSelected[1]!, this.valueSelected[0]!);

      // เช็ควันตรงกันไหม ถ้าไม่ตรงแสดงว่าเดือนนั้นไม่มีวันที่เลือก
      if (this.valueSelected[0] !== date.getDate()) {
        const lastDate = new Date(this.valueSelected[2]!, this.valueSelected[1]! + 1, 0);

        date.setDate(lastDate.getDate());
        date.setMonth(lastDate.getMonth());
        date.setFullYear(lastDate.getFullYear());

        this.valueSelected[0] = lastDate.getDate();
        this.valueSelected[1] = lastDate.getMonth();
        this.valueSelected[2] = lastDate.getFullYear();

        this.selected.emit(date);
      } else {
        date.setDate(this.valueSelected[0]!);
        date.setMonth(this.valueSelected[1]!);
        date.setFullYear(this.valueSelected[2]!);

        this.selected.emit(date);
      }
    }
  }

  private setDefaultValue() {
    const birthDate = new Date(this.defalutValue!);

    this.valueSelected[0] = birthDate.getDate();
    this.valueSelected[1] = birthDate.getMonth();
    this.valueSelected[2] = birthDate.getFullYear();
    console.log(this.valueSelected);
    this._cdr.markForCheck();
  }
}
