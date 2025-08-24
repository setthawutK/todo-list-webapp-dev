import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

// import { SuccessResponseLoginResDto } from '@shared/swagger-api.ts';
import { OpenAuthSession } from './model/open-auth-session';
// import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthSessionService {
  private readonly _router: Router = inject(Router);

  // private readonly _httpClient: HttpClient = inject(HttpClient);
  private sessionSignal$ = new Subject<void>();

  constructor() {}

  private notifySessionChange() {
    this.sessionSignal$.next();
  }

  public getSession(): OpenAuthSession | undefined {
    const json = localStorage.getItem(StorageKey.authSession);

    if (!json) {
      return undefined;
    }

    const session = JSON.parse(json);

    return session;
  }

  public getAccessToken(): string | undefined {
    const { getSession } = this;
    const session = getSession();

    return session?.accessToken;
  }

  public getRefreshToken(): string | undefined {
    const { getSession } = this;
    const session = getSession();

    return session?.refreshToken;
  }

  public getName(): string | undefined {
    const session = this.getSession();
    return session?.name;
  }

  // public getRole(): [UserRole] | undefined {
  //   const session = this.getSession();
  //   return session?.role;
  // }

  public closeSession() {
    localStorage.clear();
    sessionStorage.clear();
    this.notifySessionChange();
  }

  public closeSessionThenRedirect() {
    this.closeSession();
    const redirectUrl = ['/verification'];
    this._router.navigate(redirectUrl);
  }

  // public setSession(session: LoginResDto) {
  //   const json = JSON.stringify(session);
  //   localStorage.setItem(StorageKey.authSession, json);
  //   this.notifySessionChange();
  // }

  // public refreshAccessToken(): Observable<SuccessResponseLoginResDto> {
  //   const body = {
  //     refreshToken: this.getRefreshToken(),
  //   };

  //   return this._httpClient
  //     .post<SuccessResponseLoginResDto>('test', body)
  //     .pipe(tap(res => localStorage.setItem(StorageKey.authSession, JSON.stringify(res.data))));
  // }
}
