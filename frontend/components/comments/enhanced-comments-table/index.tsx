import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { MessageSquareTextIcon, MessageSquareWarningIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { CreateCommentDialog } from "@/components/comments/create-comment-dialog";
import { DeleteCommentDialog } from "@/components/comments/delete-comment-dialog";
import { EditCommentDialog } from "@/components/comments/edit-comment-dialog";
import { Pagination } from "@/components/pagination";
import { formatDate } from "@/utils/formatters";
import { useEnhancedCommentsTable } from "./use-enhanced-comments-table";

export const EnhancedCommentsTable = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { comments, currentPage, totalPages, isLoading } =
    useEnhancedCommentsTable();

  const redirectToLastAvailablePage = () => {
    if (comments.length > 1 || totalPages <= 1) return;

    const params = new URLSearchParams(searchParams);
    params.set("page", String(Math.max(1, totalPages - 1)));
    router.push(`?${params.toString()}`, undefined, { shallow: true });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-md border">
        <div className="relative">
          <Table className={isLoading ? "min-h-24" : ""}>
            <TableHeader>
              <TableRow className="whitespace-nowrap">
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
                  <TableCell className="min-w-48 max-w-80">
                    {comment.message}
                  </TableCell>
                  <TableCell>{formatDate(comment.createdAt)}</TableCell>
                  <TableCell>{formatDate(comment.updatedAt)}</TableCell>
                  <TableCell className="flex gap-1 flex-wrap [&>*]:grow">
                    <EditCommentDialog comment={comment} />
                    <DeleteCommentDialog
                      comment={comment}
                      onDelete={redirectToLastAvailablePage}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {isLoading ? (
            <div className="absolute inset-0 rounded-md bg-background/55 backdrop-blur-sm flex justify-center items-center">
              <Spinner className="size-16" />
            </div>
          ) : comments.length <= 0 ? (
            <div
              className={
                totalPages > 0 ? "p-6 pb-3 md:p-12 md:pb-9" : "p-6 md:p-12"
              }
            >
              {currentPage > 1 ? (
                <Empty className="p-0 md:p-0">
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <MessageSquareWarningIcon />
                    </EmptyMedia>
                    <EmptyTitle>Invalid page</EmptyTitle>
                    <EmptyDescription>
                      Selected page does not exists.
                    </EmptyDescription>
                  </EmptyHeader>
                </Empty>
              ) : (
                <Empty className="p-0 md:p-0">
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
              )}
            </div>
          ) : null}
        </div>
        <Pagination url="/" currentPage={currentPage} totalPages={totalPages} />
      </div>
      <CreateCommentDialog />
    </div>
  );
};
