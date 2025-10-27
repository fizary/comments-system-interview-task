import { useState, type FormEvent } from "react";
import { PlusIcon } from "lucide-react";
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
import { useCreateComment } from "./use-create-comment";

export const CreateCommentDialog = () => {
  const [open, setOpen] = useState(false);
  const { createComment, validate, reset, isLoading, formErrors, fieldErrors } =
    useCreateComment();

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const payload = validate({
      author: String(formData.get("author")),
      message: String(formData.get("message")),
    });

    if (!payload) return;

    createComment(payload)
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
        <Button variant="outline" className="self-end">
          <PlusIcon />
          Add comment
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add comment</DialogTitle>
          <DialogDescription>
            Add a new comment to share your opinion.
          </DialogDescription>
        </DialogHeader>
        {formErrors.length > 0 && (
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
                  <Spinner /> Adding...
                </>
              ) : (
                "Add"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
