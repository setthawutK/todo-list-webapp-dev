import { HttpContextToken, HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { inject, Injectable } from '@angular/core';
// import { NotificationService } from '@shared/services/notification';
import { AuthSessionService } from '@shared/services/session/auth-session.service';
import { catchError, throwError } from 'rxjs';

export const IGNORE_LOGOUT_EVENT = new HttpContextToken<boolean>(() => false);

@Injectable()
export class ServiceAuthInterceptor implements HttpInterceptor {
  private readonly _authSessionService = inject(AuthSessionService);
  // private readonly _notify = inject(NotificationService);

  // private isRefreshing = false;
  // private refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const { _authSessionService } = this;

    const accessToken = _authSessionService.getAccessToken();

    if (accessToken) {
      req = this.addToken(req, accessToken);
    }

    return next.handle(req).pipe(
      catchError(error => {
        if (!req.context.get(IGNORE_LOGOUT_EVENT)) {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401 && !error.url!.includes('authentications/refresh')) {
              // return this.handleTokenExpired(req, next);
            }
          }
        }

        return throwError(() => error);
      }),
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'ngrok-skip-browser-warning': 'true',
      },
    });
  }

  // private handleTokenExpired(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   if (!this.isRefreshing) {
  //     this.isRefreshing = true;
  //     this.refreshTokenSubject.next(null);

  //     this._notify.startSpinner();

  //     return this._authSessionService.refreshAccessToken().pipe(
  //       switchMap(() => {
  //         const newAccessToken = this._authSessionService.getAccessToken()!;

  //         this.isRefreshing = false;
  //         this.refreshTokenSubject.next(newAccessToken);
  //         return next.handle(this.addToken(request, newAccessToken));
  //       }),
  //       catchError(err => {
  //         this.isRefreshing = false;

  //         if (err.status === 401) {
  //           this._notify.stopSpinner();
  //           this._notify.error('เซสชั่นหมดอายุ กรุณาเข้าสู่ระบบใหม่อีกครั้ง');
  //           this._authSessionService.closeSessionThenRedirect();
  //         }

  //         if (err.status >= 500) {
  //           this._notify.stopSpinner();
  //           this._notify.error('เกิดข้อผิดพลาดกับระบบ กรุณาลองใหม่ภายหลัง');
  //         }

  //         return EMPTY;
  //       }),
  //     );
  //   } else {
  //     return this.refreshTokenSubject.pipe(
  //       filter(token => token != null),
  //       take(1),
  //       switchMap(newToken => next.handle(this.addToken(request, newToken!))),
  //     );
  //   }
  // }
}
