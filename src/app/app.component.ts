import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, inject, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '@env';
import { NotificationService } from '@shared/services/notification';
import { ToastModule } from 'primeng/toast';
import { animationFrameScheduler, debounceTime, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ToastModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  @ViewChild('portal', {
    read: ElementRef,
    static: true,
  })
  set Portal({ nativeElement }: ElementRef) {
    document.body.appendChild(nativeElement);
  }
  private readonly _notify: NotificationService = inject(NotificationService);

  readonly loading$ = timer(0).pipe(switchMap(() => this._notify.spinner.pipe(debounceTime(0, animationFrameScheduler))));

  constructor() {
    this.disableLogOnProduction();
  }

  disableLogOnProduction() {
    if (environment.production) {
      console.warn(`🚨 Console output is disabled on production!`);
      console.log = function (): void {};
      console.debug = function (): void {};
      console.warn = function (): void {};
      console.info = function (): void {};
    }
  }
}
