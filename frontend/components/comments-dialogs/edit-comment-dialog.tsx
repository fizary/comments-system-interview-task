import { useState, type FormEvent } from "react";
import { PencilIcon } from "lucide-react";
import { api } from "@/services";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { ErrorMessage } from "@/components/error-message";
import type { Comment } from "@/types/comment";
import { commentSchemaWithId } from "./comment-validators";

type EditCommentDialogProps = {
  comment: Comment;
};

export const EditCommentDialog = ({ comment }: EditCommentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [updateComment, { isLoading, error }] = api.useUpdateCommentMutation();
  const formErrors = [
    ...validationErrors,
    ...(error && "status" in error && typeof error.status === "number"
      ? [error.data.message, ...(error.data.errors ?? [])]
      : []),
  ];

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const validationResult = commentSchemaWithId.safeParse({
      id: comment.id,
      author: formData.get("author"),
      message: formData.get("message"),
    });

    if (!validationResult.success)
      return setValidationErrors(
        validationResult.error.issues.map((issue) => issue.message)
      );

    try {
      setValidationErrors([]);
      await updateComment(validationResult.data).unwrap();
      setOpen(false);
    } catch {}
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PencilIcon size={16} />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit comment</DialogTitle>
          <DialogDescription>
            Edit your comment to correct or add information.
          </DialogDescription>
        </DialogHeader>
        {formErrors.length > 0 && <ErrorMessage errors={formErrors} />}
        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="author">Author</FieldLabel>
              <Input
                id="author"
                name="author"
                placeholder="Enter your name or nickname"
                defaultValue={comment.author}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <Textarea
                id="message"
                name="message"
                placeholder="Share your opinion"
                defaultValue={comment.message}
              />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner /> Updating...
                </>
              ) : (
                "Update"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
