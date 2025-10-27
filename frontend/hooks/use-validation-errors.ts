import * as z from "zod";
import { type SerializedError } from "@reduxjs/toolkit";
import type { CustomFetchBaseQueryError } from "@/types/api";

export const useValidationErrors = <T>(
  validationError: z.ZodError<T> | undefined,
  apiError: CustomFetchBaseQueryError<unknown> | SerializedError | undefined
): z.core.$ZodFlattenedError<T> => {
  if (validationError) return z.flattenError(validationError);

  if (typeof apiError !== "object" || apiError === null)
    return { formErrors: [], fieldErrors: {} };

  if ("status" in apiError) {
    if (typeof apiError.status === "string")
      return { formErrors: ["An unexpected error occured."], fieldErrors: {} };

    return {
      formErrors: [apiError.data.message],
      fieldErrors: { ...apiError.data.errors },
    };
  }

  return { formErrors: ["An unexpected error occured."], fieldErrors: {} };
};
