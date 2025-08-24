import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'thaiDate',
})
export class ThaiDatePipe implements PipeTransform {
  transform(value: Date | string, type: 'full' | 'short' = 'short'): string {
    if (!value) return '-';

    const months_full = [
      'มกราคม',
      'กุมภาพันธ์',
      'มีนาคม',
      'เมษายน',
      'พฤษภาคม',
      'มิถุนายน',
      'กรกฎาคม',
      'สิงหาคม',
      'กันยายน',
      'ตุลาคม',
      'พฤศจิกายน',
      'ธันวาคม',
    ];

    const months_short = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

    const date = new Date(value);
    if (isNaN(date.getTime())) return '-';

    const day = date.getDate();
    const month = type === 'short' ? months_short[date.getMonth()] : months_full[date.getMonth()];
    const year = date.getFullYear() + 543;

    return `${day} ${month} ${year}`;
  }
}
