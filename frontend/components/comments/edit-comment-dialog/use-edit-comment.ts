import { useState } from "react";
import { type ZodError } from "zod";
import { api } from "@/services";
import { useValidationErrors } from "@/hooks/use-validation-errors";
import { type CommentPayload } from "@/types/comment";
import { commentSchema } from "../comment-validators";

export const useEditComment = () => {
  const [validationErrors, setValidationErrors] = useState<
    ZodError<CommentPayload> | undefined
  >(undefined);
  const [updateComment, { isLoading, error, reset: resetApi }] =
    api.useUpdateCommentMutation();
  const { formErrors, fieldErrors } = useValidationErrors<CommentPayload>(
    validationErrors,
    error
  );

  const validate = (payload: CommentPayload) => {
    const validationResult = commentSchema.safeParse(payload);

    if (!validationResult.success) {
      setValidationErrors(validationResult.error);
      return undefined;
    }

    setValidationErrors(undefined);
    return validationResult.data;
  };

  const reset = () => {
    setValidationErrors(undefined);
    resetApi();
  };

  return { updateComment, validate, reset, isLoading, formErrors, fieldErrors };
};
