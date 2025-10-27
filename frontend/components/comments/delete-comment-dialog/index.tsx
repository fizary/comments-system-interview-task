import { useState } from "react";
import { TrashIcon } from "lucide-react";
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
import type { Comment } from "@/types/comment";
import { useDeleteComment } from "./use-delete-comment";

type EditCommentDialogProps = {
  comment: Comment;
  onDelete?: () => void;
};

export const DeleteCommentDialog = ({
  comment,
  onDelete,
}: EditCommentDialogProps) => {
  const [open, setOpen] = useState(false);
  const { deleteComment, reset, isLoading, formErrors } = useDeleteComment();

  const deleteHandler = () => {
    deleteComment(comment.id)
      .unwrap()
      .then(() => {
        openChangeHandler(false);
        if (onDelete) onDelete();
      })
      .catch(() => {});
  };

  const openChangeHandler = (open: boolean) => {
    if (!open) reset();
    setOpen(open);
  };

  return (
    <Dialog open={open} onOpenChange={openChangeHandler}>
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
        {formErrors && (
          <div className="text-destructive">
            {formErrors.map((error) => (
              <div key={error}>{error}</div>
            ))}
          </div>
        )}
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
            disabled={isLoading}
            onClick={deleteHandler}
          >
            {isLoading ? (
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
