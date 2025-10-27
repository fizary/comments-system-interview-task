import { api } from "@/services";
import { useCurrentPage, getPaginationFilters } from "@/components/pagination";
import { COMMENTS_PER_PAGE } from "@/constants";

export const useEnhancedCommentsTable = () => {
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

  return { comments, currentPage, totalPages, isLoading: isFetching };
};
