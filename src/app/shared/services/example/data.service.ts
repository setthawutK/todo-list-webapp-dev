import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class DataService {
  leaveRequest = [
    {
      leaveRequestId: 6,
      requestedDate: '1/4/2568',
      code: '006',
      startDate: '2/4/2568',
      endDate: '2/4/2568',
      totalDays: 0.5,
      employeeName: 'AAA AAA',
      position: 'Staff',
      leaveType: 'ลากิจ',
      contact: '0123456789',
      replacement: 'ZZZ ZZZ',
      positionReplacement: 'CLevel',
      reason: 'หมอนัด',
      status: 'รออนุมัติ',
    },
    {
      leaveRequestId: 5,
      requestedDate: '1/4/2568',
      code: '005',
      startDate: '22/4/2568',
      endDate: '26/4/2568',
      totalDays: 5,
      employeeName: 'AAB CCC',
      position: 'Staff',
      leaveType: 'ลาพักร้อน',
      contact: '032-165-4985',
      replacement: 'ZZZ ZZZ',
      positionReplacement: 'CLevel',
      reason: '',
      status: 'รออนุมัติแก้ไข',
    },
    {
      leaveRequestId: 4,
      requestedDate: '1/4/2568',
      code: '004',
      startDate: '2/4/2568',
      endDate: '2/4/2568',
      totalDays: 0.5,
      employeeName: 'KOA PPA',
      position: 'CLevel',
      leaveType: 'ลาอื่นๆ',
      contact: '036-985-2147',
      replacement: 'PAN SSA',
      positionReplacement: 'Ceo',
      reason: '',
      status: 'รออนุมัติยกเลิก',
    },
    {
      leaveRequestId: 3,
      requestedDate: '2/4/2568',
      code: '003',
      startDate: '4/4/2568',
      endDate: '5/4/2568',
      totalDays: 1,
      employeeName: 'WSX VCC',
      position: 'Manager',
      leaveType: 'ลากิจ',
      contact: '026-435-1974',
      replacement: 'QWE VRF',
      positionReplacement: 'Director',
      reason: '',
      status: 'อนุมัติ',
    },
    {
      leaveRequestId: 2,
      requestedDate: '1/4/2568',
      code: '002',
      startDate: '2/4/2568',
      endDate: '2/4/2568',
      totalDays: 0.5,
      employeeName: 'ASD XYZ',
      position: 'Staff',
      leaveType: 'ลากิจ',
      contact: '015-935-7246',
      replacement: 'ZZZ ZZZ',
      positionReplacement: 'CLevel',
      reason: 'ไปทำธุระที่ AXA',
      status: 'ไม่อนุมัติ',
    },
    {
      leaveRequestId: 1,
      requestedDate: '4/2/2568',
      code: '001',
      startDate: '31/3/2568',
      endDate: '4/4/2568',
      totalDays: 5,
      employeeName: 'ABC AAA',
      position: 'Director',
      leaveType: 'ลาพักร้อน',
      contact: '025-814-7369',
      replacement: 'ZZZ ZZZ',
      positionReplacement: 'CLevel',
      reason: '',
      status: 'ยกเลิก',
    },
  ];

  constructor() {}

  getData(): Observable<Data[]> {
    return of(this.leaveRequest);
  }
}

export interface Data {
  leaveRequestId: number;
  requestedDate: string;
  code: string;
  startDate: string;
  endDate: string;
  totalDays: number;
  employeeName: string;
  position: string;
  leaveType: string;
  contact: string;
  replacement: string;
  positionReplacement: string;
  reason: string;
  status: string;
}
