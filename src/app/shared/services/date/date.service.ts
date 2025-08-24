import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateService {
  constructor() {}

  // getDate(d: Date | string) {
  //   return moment(d).format('YYYY-MM-DD');
  // }

  getDateWithLocalTime(d: Date | string) {
    const date = new Date(d);
    const yyyy = date.getUTCFullYear();
    const mm = String(date.getUTCMonth() + 1).padStart(2, '0');
    const dd = String(date.getUTCDate()).padStart(2, '0');
    const hh = String(date.getUTCHours()).padStart(2, '0');
    const min = String(date.getUTCMinutes()).padStart(2, '0');
    const ss = String(date.getUTCSeconds()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}T${hh}:${min}:${ss}Z`;
  }

  // getDateWithUTCTime(d: Date | string) {
  //   return moment(d).format('YYYY-MM-DDTHH:mm:ssZ');
  // }

  getCutOfDate() {
    const today = new Date();
    const nextSunday = new Date(today);
    const daysUntilNextSunday = (7 - today.getDay()) % 7;
    nextSunday.setDate(today.getDate() + daysUntilNextSunday);
    return nextSunday;
  }

  getTimeZone() {
    const offset = new Date().getTimezoneOffset();
    const absOffset = Math.abs(offset);
    const hours = Math.floor(absOffset / 60);
    const minutes = absOffset % 60;
    const sign = offset <= 0 ? '+' : '-';

    return [parseInt(sign + hours), parseInt(sign + minutes)];
  }

  getLastTwoYearsDropdown() {
    const currentYear = new Date().getFullYear();
    const buddhistYear = currentYear + 543;
    return [
      { label: `${buddhistYear}`, value: currentYear },
      { label: `${buddhistYear - 1}`, value: currentYear - 1 },
    ];
  }

  getMonthsDropDown() {
    const months = [
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
    ].map((name, index) => ({
      label: name,
      value: index + 1,
    }));

    return months;
  }
}
