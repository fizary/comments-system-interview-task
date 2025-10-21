import { useSearchParams } from "next/navigation";

export const COMMENTS_LIMIT_FILTER = 10;

export const useGetCommentsFilters = () => {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page"));

  return Number.isSafeInteger(currentPage) && currentPage > 0
    ? {
        limit: COMMENTS_LIMIT_FILTER,
        offset: (currentPage - 1) * COMMENTS_LIMIT_FILTER,
      }
    : { limit: COMMENTS_LIMIT_FILTER };
};
