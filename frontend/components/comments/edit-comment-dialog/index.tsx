import { useState, type FormEvent } from "react";
import { PencilIcon } from "lucide-react";
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
import {
  FieldGroup,
  Field,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import type { Comment } from "@/types/comment";
import { useEditComment } from "./use-edit-comment";

type EditCommentDialogProps = {
  comment: Comment;
};

export const EditCommentDialog = ({ comment }: EditCommentDialogProps) => {
  const [open, setOpen] = useState(false);
  const { updateComment, validate, reset, isLoading, formErrors, fieldErrors } =
    useEditComment();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const payload = validate({
      author: String(formData.get("author")),
      message: String(formData.get("message")),
    });

    if (!payload) return;

    updateComment({
      id: comment.id,
      ...payload,
    })
      .unwrap()
      .then(() => openChangeHandler(false))
      .catch(() => {});
  };

  const openChangeHandler = (open: boolean) => {
    if (!open) reset();
    setOpen(open);
  };

  return (
    <Dialog open={open} onOpenChange={openChangeHandler}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <PencilIcon size={16} />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit comment</DialogTitle>
          <DialogDescription>
            Edit your comment to correct or add information.
          </DialogDescription>
        </DialogHeader>
        {formErrors && (
          <div className="text-destructive">
            {formErrors.map((error) => (
              <div key={error}>{error}</div>
            ))}
          </div>
        )}
        <form onSubmit={submitHandler} className="flex flex-col gap-5">
          <FieldGroup>
            <Field data-invalid={fieldErrors?.author && true}>
              <FieldLabel htmlFor="author">Author</FieldLabel>
              <Input
                id="author"
                name="author"
                placeholder="Enter your name or nickname"
                defaultValue={comment.author}
                aria-invalid={fieldErrors?.author && true}
              />
              {fieldErrors?.author && (
                <FieldError
                  errors={fieldErrors.author.map((e) => ({ message: e }))}
                />
              )}
            </Field>
            <Field data-invalid={fieldErrors?.message && true}>
              <FieldLabel htmlFor="message">Message</FieldLabel>
              <Textarea
                id="message"
                name="message"
                placeholder="Share your opinion"
                defaultValue={comment.message}
                aria-invalid={fieldErrors?.message && true}
                className="min-h-24 resize-none"
              />
              {fieldErrors?.message && (
                <FieldError
                  errors={fieldErrors.message.map((e) => ({ message: e }))}
                />
              )}
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
