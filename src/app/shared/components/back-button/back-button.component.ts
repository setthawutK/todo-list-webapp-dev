import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Output, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-back-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BackButtonComponent {
  @Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ContentChild('actionButton', { static: true }) actionButton!: TemplateRef<unknown>;

  click() {
    this.clicked.emit(true);
  }
}
