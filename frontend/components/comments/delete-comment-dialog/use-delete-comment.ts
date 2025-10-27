import { api } from "@/services";
import { useValidationErrors } from "@/hooks/use-validation-errors";

export const useDeleteComment = () => {
  const [deleteComment, { isLoading, isSuccess, error, reset: resetApi }] =
    api.useDeleteCommentMutation();
  const { formErrors, fieldErrors } = useValidationErrors(undefined, error);

  const reset = () => {
    resetApi();
  };

  return {
    deleteComment,
    reset,
    isLoading: isLoading || isSuccess,
    formErrors,
    fieldErrors,
  };
};
