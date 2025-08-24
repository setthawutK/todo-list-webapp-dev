import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, DialogModule, InputTextModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  readonly config: DynamicDialogConfig = inject(DynamicDialogConfig);
  readonly ref: DynamicDialogRef = inject(DynamicDialogRef);

  constructor() {}

  onClick() {
    this.ref.close({ confirm: true });
  }

  hiddenDialog() {
    this.ref.close(false);
  }
}

export interface dataConfirmDialog {
  header: string;
  content: string;
  actionLabel: string;
  isDelete: boolean;
  hasInput: boolean;
}
