import { type Action, type PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import type { BaseQueryFn, ApiResponse } from "@/types/api";
import { createCommentEndpoints } from "./comments";

function isHydrateAction(action: Action): action is PayloadAction<any> {
  return action.type === HYDRATE;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    responseHandler: async (response) => {
      const payload = (await response.json()) as ApiResponse<unknown>;

      return payload.success
        ? payload.data
        : { message: payload.message, errors: payload.errors ?? [] };
    },
  }) as BaseQueryFn,
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) return action.payload[reducerPath];
  },
  endpoints: (build) => ({
    ...createCommentEndpoints(build),
  }),
  tagTypes: ["comments"],
});
