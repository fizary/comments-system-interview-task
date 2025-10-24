import { useState } from "react";
import { TrashIcon } from "lucide-react";
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
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { ErrorMessage } from "@/components/error-message";
import type { Comment } from "@/types/comment";

type EditCommentDialogProps = {
  comment: Comment;
};

export const DeleteCommentDialog = ({ comment }: EditCommentDialogProps) => {
  const [open, setOpen] = useState(false);
  const [deleteComment, { isLoading, isSuccess, error }] =
    api.useDeleteCommentMutation();
  const formErrors =
    error && "status" in error && typeof error.status === "number"
      ? [error.data.message, ...(error.data.errors ?? [])]
      : [];
  const isProcessing = isLoading || isSuccess;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <TrashIcon size={16} />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete comment</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the comment?
          </DialogDescription>
        </DialogHeader>
        {formErrors.length > 0 && <ErrorMessage errors={formErrors} />}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Message</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>{comment.id}</TableCell>
              <TableCell>{comment.author}</TableCell>
              <TableCell>{comment.message}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">No</Button>
          </DialogClose>
          <Button
            variant="destructive"
            disabled={isProcessing}
            onClick={() => deleteComment(comment.id)}
          >
            {isProcessing ? (
              <>
                <Spinner /> Deleting...
              </>
            ) : (
              "Yes, i am sure!"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
