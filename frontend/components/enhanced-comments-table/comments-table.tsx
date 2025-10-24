import { MessageSquareTextIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  EditCommentDialog,
  DeleteCommentDialog,
} from "@/components/comments-dialogs";
import { Spinner } from "@/components/ui/spinner";
import { formatDate } from "@/utils/formatters";
import type { Comment } from "@/types/comment";

type CommentsTableProps = {
  comments: Comment[];
  isLoading: boolean;
};

export const CommentsTable = ({ comments, isLoading }: CommentsTableProps) => {
  return (
    <div className="relative">
      <Table>
        <TableHeader className="sticky top-0 bg-background">
          <TableRow className="whitespace-nowrap">
            <TableHead>ID</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Message</TableHead>
            <TableHead>Created at</TableHead>
            <TableHead>Modified at</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="relative">
          {comments.map((comment) => (
            <TableRow key={comment.id}>
              <TableCell>{comment.id}</TableCell>
              <TableCell>{comment.author}</TableCell>
              <TableCell className="min-w-36 max-w-80">
                {comment.message}
              </TableCell>
              <TableCell>{formatDate(comment.createdAt)}</TableCell>
              <TableCell>{formatDate(comment.updatedAt)}</TableCell>
              <TableCell className="flex gap-1 flex-wrap [&>*]:grow">
                <EditCommentDialog comment={comment} />
                <DeleteCommentDialog comment={comment} />
              </TableCell>
            </TableRow>
          ))}
          {isLoading && (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={6}>
                {comments.length <= 0 && <div className="size-10"></div>}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {isLoading && (
        <div className="absolute inset-0 bg-background/55 backdrop-blur-sm flex justify-center items-center">
          <Spinner className="size-16" />
        </div>
      )}
      {!isLoading && comments.length <= 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <MessageSquareTextIcon />
            </EmptyMedia>
            <EmptyTitle>No comments</EmptyTitle>
            <EmptyDescription>
              No comments have been added yet.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : null}
    </div>
  );
};
