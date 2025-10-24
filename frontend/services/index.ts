import { type Action, type PayloadAction } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import type { BaseQueryFn } from "@/types/api";
import { createCommentEndpoints } from "./comments";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isHydrateAction(action: Action): action is PayloadAction<any> {
  return action.type === HYDRATE;
}

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.NEXT_PUBLIC_DOCKER_API_URL ?? process.env.NEXT_PUBLIC_API_URL,
  }) as BaseQueryFn,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extractRehydrationInfo(action, { reducerPath }): any {
    if (isHydrateAction(action)) return action.payload[reducerPath];
  },
  endpoints: (build) => ({
    ...createCommentEndpoints(build),
  }),
  tagTypes: ["comments"],
});
