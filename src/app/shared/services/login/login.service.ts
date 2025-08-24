import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private readonly _httpClient: HttpClient = inject(HttpClient);

  constructor() {}

  // login(body: LoginReq): Observable<SuccessResponseLoginResDto> {
  //   return this._httpClient.post<SuccessResponseLoginResDto>(ileaveAPI.apiV1AuthenticationsLogin, body);
  // }

  // logout(body: LogoutReq): Observable<SuccessResponseVoid> {
  //   return this._httpClient.post<SuccessResponseVoid>(ileaveAPI.apiV1AuthenticationsLogout, body);
  // }
}
