import { api } from "@/services";
import {
  Pagination,
  useCurrentPage,
  getPaginationFilters,
} from "@/components/pagination";
import { COMMENTS_PER_PAGE } from "@/constants";
import { CommentsTable } from "./comments-table";

export const EnhancedCommentsTable = () => {
  const currentPage = useCurrentPage();
  const paginationFilters = getPaginationFilters(
    currentPage,
    COMMENTS_PER_PAGE
  );
  const { data, isFetching } = api.useGetCommentsQuery(paginationFilters);
  const totalPages = Math.ceil(
    (data?.metadata?.totalItems ?? 1) / COMMENTS_PER_PAGE
  );
  const comments = data?.data ?? [];

  return (
    <div className="rounded-md border">
      <CommentsTable comments={comments} isLoading={isFetching} />
      <Pagination url="/" currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
};
