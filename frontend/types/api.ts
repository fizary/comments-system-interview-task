import {
  type EndpointBuilder,
  type BaseQueryFn as BaseQueryFnOrigin,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

type SuccessResponse<T> = {
  success: true;
  data: T;
};

type ErrorResponse = {
  success: false;
  message: string;
  errors?: string[];
};

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

export type BaseQueryFn = BaseQueryFnOrigin<
  string | FetchArgs,
  unknown,
  | { status: number; data: { message: string; errors?: string[] } }
  | Extract<FetchBaseQueryError, { status: string }>
>;

export type ApiBuilder = EndpointBuilder<BaseQueryFn, string, "api">;
