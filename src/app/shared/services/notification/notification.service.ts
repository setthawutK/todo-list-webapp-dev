import { EventEmitter, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  spinner = new EventEmitter<boolean>();

  constructor(
    private snackbar: MatSnackBar,
    private messageService: MessageService,
  ) {}

  error(message: string = 'บันทึกข้อมูลไม่สำเร็จ', action?: string) {
    return this.snackbar.open(message, action, SNACK_BAR_CONFIG['error']);
  }

  info(message: string = '', action?: string) {
    return this.snackbar.open(message, action, SNACK_BAR_CONFIG['info']);
  }

  success(message: string = 'บันทึกข้อมูลเรียบร้อยแล้ว', action?: string) {
    return this.snackbar.open(message, action, SNACK_BAR_CONFIG['success']);
  }

  warn(message: string = '', action?: string) {
    return this.snackbar.open(message, action, SNACK_BAR_CONFIG['warn']);
  }

  showSuccess(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  showInfo(message: string) {
    this.messageService.add({ severity: 'info', summary: 'Info', detail: message });
  }

  showWarn(message: string) {
    this.messageService.add({ severity: 'warn', summary: 'Warn', detail: message });
  }
  showError(message: string, summary: string) {
    this.messageService.add({ severity: 'error', summary: summary, detail: message });
  }

  startSpinner() {
    this.spinner.emit(true);
  }

  stopSpinner() {
    this.spinner.emit(false);
  }
}

const SNACK_BAR_CONFIG: Record<string, MatSnackBarConfig> = {
  error: {
    duration: 2700,
    horizontalPosition: 'end',
    panelClass: 'notify-info',
  },
  info: {
    duration: 1500,
    horizontalPosition: 'end',
    panelClass: 'notify-info',
  },
  success: {
    duration: 1500,
    horizontalPosition: 'end',
    panelClass: 'notify-info',
  },
  warn: {
    duration: 2000,
    horizontalPosition: 'end',
    panelClass: 'notify-info',
  },
};
