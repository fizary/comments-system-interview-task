import {
  type EndpointBuilder,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";

type Metadata = {
  totalItems?: number;
};

export type ApiResponse<T> = {
  success: true;
  data: T;
  metadata?: Metadata;
};

export type ApiError<T> = {
  success: false;
  message: string;
  errors?: { [K in keyof T]: string[] };
};

export type CustomFetchBaseQueryError<T> =
  | { status: number; data: ApiError<T> }
  | Extract<FetchBaseQueryError, { status: string }>;

export type CustomBaseQueryFn = BaseQueryFn<
  string | FetchArgs,
  unknown,
  CustomFetchBaseQueryError<unknown>,
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  {},
  FetchBaseQueryMeta
>;

export type CustomEndpointBuilder = EndpointBuilder<
  CustomBaseQueryFn,
  string,
  "api"
>;
