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
import { formatDate } from "@/utils/formatters";
import type { Comment } from "@/types/comment";

type CommentsTableProps = {
  comments: Comment[];
};

export const CommentsTable = ({ comments }: CommentsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead>Modified at</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
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
      </TableBody>
    </Table>
  );
};
