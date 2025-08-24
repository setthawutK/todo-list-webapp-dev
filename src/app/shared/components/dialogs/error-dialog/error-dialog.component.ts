import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-error-dialog',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorDialogComponent {
  readonly config: DynamicDialogConfig = inject(DynamicDialogConfig);
  readonly ref: DynamicDialogRef = inject(DynamicDialogRef);

  action() {
    this.ref.close(true);
  }
}
