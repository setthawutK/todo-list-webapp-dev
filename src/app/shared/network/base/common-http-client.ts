import {
  HttpClient,
  HttpContext,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestElement } from './request-element';

export interface RequestOptions<Body> {
  body?: Body;
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  context?: HttpContext;
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
      };
  responseType?: 'json';
  reportProgress?: boolean;
  withCredentials?: boolean;
}

export class CommonHttpHandler implements HttpHandler {
  constructor(private delegated: HttpHandler) {}

  handle(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    return this.delegated.handle(req.clone({ url: `${new URL(req.url, globalThis.origin)}` }));
  }
}

@Injectable({
  providedIn: 'root',
})
export class CommonHttpClient extends HttpClient {
  constructor(handler: HttpHandler) {
    super(new CommonHttpHandler(handler));
  }

  requestAPI<Result = any, Body = any>(request: string, options?: RequestOptions<Body>): Observable<Result> {
    const requestElement = RequestElement.create(request);

    return super.request<Result>(requestElement.method, requestElement.url, options);
  }
}
