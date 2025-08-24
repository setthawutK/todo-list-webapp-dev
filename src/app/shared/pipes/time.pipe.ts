import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value: Date | string): string {
    const date = new Date(value);
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'Asia/Bangkok',
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
  }
}
