import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { withParams } from '@shared/network';
import {
  ActiveUserReqDto,
  CreateUserReqDto,
  DeleteUserReqDto,
  SuccessResponseIdResponseLong,
  SuccessResponsePagedModelSearchUserResDto,
  SuccessResponseSearchUserCountResDto,
  SuccessResponseUploadFileRes,
  SuccessResponseUserResDto,
  SuccessResponseVoid,
  UpdateUserReqDto,
} from '@shared/swagger/example/Api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExampleService {
  private readonly _httpClient: HttpClient = inject(HttpClient);

  getUsers(path: HttpParams): Observable<SuccessResponsePagedModelSearchUserResDto> {
    return this._httpClient.get<SuccessResponsePagedModelSearchUserResDto>(ExampleAPI.userApiV1Users, {
      params: path,
    });
  }

  getUserById(id: number): Observable<SuccessResponseUserResDto> {
    return this._httpClient.get<SuccessResponseUserResDto>(withParams(ExampleAPI.userApiV1Users$1Info, id));
  }

  getUsersCount(path: HttpParams): Observable<SuccessResponseSearchUserCountResDto> {
    return this._httpClient.get<SuccessResponseSearchUserCountResDto>(ExampleAPI.userApiV1UsersCount, {
      params: path,
    });
  }

  createUser(body: CreateUserReqDto): Observable<SuccessResponseIdResponseLong> {
    return this._httpClient.post<SuccessResponseIdResponseLong>(ExampleAPI.userApiV1UsersCreate, body);
  }

  updateUser(body: UpdateUserReqDto, id: number): Observable<SuccessResponseVoid> {
    return this._httpClient.put<SuccessResponseVoid>(withParams(ExampleAPI.userApiV1Users$1Update, id), body);
  }

  deleteUser(body: DeleteUserReqDto, id: number): Observable<SuccessResponseVoid> {
    return this._httpClient.put<SuccessResponseVoid>(withParams(ExampleAPI.userApiV1Users$1Deleted, id), body);
  }

  activeUser(body: ActiveUserReqDto, id: number): Observable<SuccessResponseVoid> {
    return this._httpClient.put<SuccessResponseVoid>(withParams(ExampleAPI.userApiV1Users$1Active, id), body);
  }

  uploadImg(body: FormData) {
    return this._httpClient.post<SuccessResponseUploadFileRes>(ExampleAPI.userApiV1UsersUploadImage, body);
  }

  getUploadFileBody(file: File): FormData {
    const formData = new FormData();
    formData.append('file', file);
    return formData;
  }
}
