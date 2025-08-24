/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ErrorDetailVoid {
  code?: string;
  subCode?: string;
  message?: string;
  data?: object;
}

export interface ErrorResponseVoid {
  status?: string;
  error?: ErrorDetailVoid;
}

export interface UpdateUserReqDto {
  imagePath?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  /** @format date */
  birthDate?: string;
}

export interface SuccessResponseVoid {
  status?: string;
  data?: object;
}

export interface DeleteUserReqDto {
  isDeleted: boolean;
}

export interface ActiveUserReqDto {
  isActive: boolean;
}

export interface UploadProfileImageReq {
  /** @format binary */
  file: File;
}

export interface SuccessResponseUploadFileRes {
  status?: string;
  data?: UploadFileRes;
}

export interface UploadFileRes {
  /** @format int64 */
  id?: number;
  code?: string;
  fullPath?: string;
}

export interface CreateUserReqDto {
  imagePath: string;
  title: string;
  firstName: string;
  lastName: string;
  /** @format date */
  birthDate: string;
}

export interface IdResponseLong {
  /** @format int64 */
  id?: number;
}

export interface SuccessResponseIdResponseLong {
  status?: string;
  data?: IdResponseLong;
}

export interface SearchUserCriteria {
  fullNameLike?: string;
  /** @format date */
  birthDateEqual?: string;
}

export interface SearchUserOrder {
  id?: "ASC" | "DESC";
  createAtDate?: "ASC" | "DESC";
}

export interface SearchUserRequest {
  criteria?: SearchUserCriteria;
  order?: SearchUserOrder;
}

export interface PageOption {
  /**
   * @format int32
   * @min 1
   */
  page?: number;
  /**
   * @format int32
   * @min 1
   * @max 100
   */
  pageSize?: number;
}

export interface PageMetadata {
  /** @format int64 */
  size?: number;
  /** @format int64 */
  number?: number;
  /** @format int64 */
  totalElements?: number;
  /** @format int64 */
  totalPages?: number;
}

export interface PagedModelSearchUserResDto {
  content?: SearchUserResDto[];
  page?: PageMetadata;
}

export interface SearchUserResDto {
  /** @format int64 */
  id?: number;
  title?: string;
  firstName?: string;
  lastName?: string;
  /** @format date */
  birthDate?: string;
  isActive?: boolean;
  isDeleted?: boolean;
  /** @format date-time */
  createAtDate?: string;
  /** @format date-time */
  statusAtDate?: string;
}

export interface SuccessResponsePagedModelSearchUserResDto {
  status?: string;
  data?: PagedModelSearchUserResDto;
}

export interface SuccessResponseUserResDto {
  status?: string;
  data?: UserResDto;
}

export interface UserResDto {
  /** @format int64 */
  id?: number;
  imageProfile?: string;
  title?: string;
  firstName?: string;
  lastName?: string;
  /** @format date */
  birthDate?: string;
}

export interface SearchUserCountResDto {
  /** @format int64 */
  total?: number;
}

export interface SuccessResponseSearchUserCountResDto {
  status?: string;
  data?: SearchUserCountResDto;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "http://103.99.11.188:30919";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => "undefined" !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string") ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== "string" ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === "undefined" || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Initial Service API
 * @baseUrl http://103.99.11.188:30919
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  user = {
    /**
     * No description
     *
     * @tags User
     * @name Update
     * @summary แก้ไขผู้ใช้งาน
     * @request PUT:/user/api/v1/users/{id}/update
     * @secure
     */
    update: (id: number, data: UpdateUserReqDto, params: RequestParams = {}) =>
      this.request<SuccessResponseVoid, ErrorResponseVoid>({
        path: `/user/api/v1/users/${id}/update`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name Deleted
     * @summary ลบผู้ใช้งาน
     * @request PUT:/user/api/v1/users/{id}/deleted
     * @secure
     */
    deleted: (id: number, data: DeleteUserReqDto, params: RequestParams = {}) =>
      this.request<SuccessResponseVoid, ErrorResponseVoid>({
        path: `/user/api/v1/users/${id}/deleted`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name Active
     * @summary เปิด/ปิด ผู้ใช้งาน
     * @request PUT:/user/api/v1/users/{id}/active
     * @secure
     */
    active: (id: number, data: ActiveUserReqDto, params: RequestParams = {}) =>
      this.request<SuccessResponseVoid, ErrorResponseVoid>({
        path: `/user/api/v1/users/${id}/active`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name UploadProfileImage
     * @request POST:/user/api/v1/users/upload/image
     * @secure
     */
    uploadProfileImage: (data: UploadProfileImageReq, params: RequestParams = {}) =>
      this.request<SuccessResponseUploadFileRes, ErrorResponseVoid>({
        path: `/user/api/v1/users/upload/image`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.FormData,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name Create
     * @summary เพิ่มผู้ใช้งาน
     * @request POST:/user/api/v1/users/create
     * @secure
     */
    create: (data: CreateUserReqDto, params: RequestParams = {}) =>
      this.request<SuccessResponseIdResponseLong, ErrorResponseVoid>({
        path: `/user/api/v1/users/create`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name FindAllUser
     * @summary รายการข้อมูลผู้ใช้งาน
     * @request GET:/user/api/v1/users
     * @secure
     */
    findAllUser: (
      query: {
        filterRequest: SearchUserRequest;
        pageOption: PageOption;
      },
      params: RequestParams = {},
    ) =>
      this.request<SuccessResponsePagedModelSearchUserResDto, ErrorResponseVoid>({
        path: `/user/api/v1/users`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name GetUserInfoById
     * @summary ดูข้อมูลผู้ใช้งาน
     * @request GET:/user/api/v1/users/{id}/info
     * @secure
     */
    getUserInfoById: (id: number, params: RequestParams = {}) =>
      this.request<SuccessResponseUserResDto, ErrorResponseVoid>({
        path: `/user/api/v1/users/${id}/info`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags User
     * @name CountAllUser
     * @request GET:/user/api/v1/users/count
     * @secure
     */
    countAllUser: (
      query: {
        filterRequest: SearchUserRequest;
      },
      params: RequestParams = {},
    ) =>
      this.request<SuccessResponseSearchUserCountResDto, ErrorResponseVoid>({
        path: `/user/api/v1/users/count`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),
  };
  public = {
    /**
     * No description
     *
     * @tags health-controller
     * @name Check
     * @request GET:/public/health
     * @secure
     */
    check: (params: RequestParams = {}) =>
      this.request<void, ErrorResponseVoid>({
        path: `/public/health`,
        method: "GET",
        secure: true,
        ...params,
      }),
  };
}
