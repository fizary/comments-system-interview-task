import { MessageSquareTextIcon } from "lucide-react";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Spinner } from "@/components/ui/spinner";
import { api } from "@/services";
import { CommentsTable } from "./comments-table";
import {
  useGetCommentsFilters,
  COMMENTS_LIMIT_FILTER,
} from "./use-get-comments-filters";

export const EnhancedCommentsTable = () => {
  const getCommentsFilters = useGetCommentsFilters();
  const { data, isLoading } = api.useGetCommentsQuery(getCommentsFilters);
  const comments = data ?? [];

  return (
    <div className="rounded-md border">
      <CommentsTable comments={comments} />
      {isLoading ? (
        <div className="p-5 flex justify-center items-center">
          <Spinner className="size-16" />
        </div>
      ) : (
        comments.length <= 0 && (
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
        )
      )}
    </div>
  );
};

export { COMMENTS_LIMIT_FILTER };
