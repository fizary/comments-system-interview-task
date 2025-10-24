import {
  type EndpointBuilder,
  type BaseQueryFn as BaseQueryFnOrigin,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

type Metadata = {
  totalItems?: number;
};

export type ApiResponse<T> = {
  success: true;
  data: T;
  metadata?: Metadata;
};

type ErrorResponse = {
  success: false;
  message: string;
  errors?: string[];
};

export type BaseQueryFn = BaseQueryFnOrigin<
  string | FetchArgs,
  unknown,
  | { status: number; data: ErrorResponse }
  | Extract<FetchBaseQueryError, { status: string }>
>;

export type ApiBuilder = EndpointBuilder<BaseQueryFn, string, "api">;
