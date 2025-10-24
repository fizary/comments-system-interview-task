function range(start: number, end: number) {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
}

type CreatePaginationArgs = {
  outerBoundary?: number;
  innerBoundary?: number;
  totalPages?: number;
  currentPage: number;
};

export function createPagination({
  outerBoundary = 1,
  innerBoundary = 1,
  totalPages = 1,
  currentPage,
}: CreatePaginationArgs) {
  const outerBoundaryStart = range(1, Math.min(outerBoundary, totalPages));
  const outerBoundaryEnd = range(
    Math.max(totalPages - outerBoundary + 1, outerBoundary + 1),
    totalPages
  );

  const innerBoundaryStart = Math.max(
    Math.min(
      currentPage - innerBoundary,
      totalPages - outerBoundary - innerBoundary * 2 - 1
    ),
    outerBoundary + 2
  );

  const innerBoundaryEnd = Math.min(
    Math.max(
      currentPage + innerBoundary,
      outerBoundary + innerBoundary * 2 + 2
    ),
    outerBoundaryEnd.length > 0 ? outerBoundaryEnd[0] - 2 : totalPages - 1
  );

  return [
    ...outerBoundaryStart,
    ...(innerBoundaryStart > outerBoundary + 2
      ? ["ellipsis-start"]
      : outerBoundary + 1 < totalPages - outerBoundary
      ? [outerBoundary + 1]
      : []),
    ...range(innerBoundaryStart, innerBoundaryEnd),
    ...(innerBoundaryEnd < totalPages - outerBoundary - 1
      ? ["ellipsis-end"]
      : totalPages - outerBoundary > outerBoundary
      ? [totalPages - outerBoundary]
      : []),
    ...outerBoundaryEnd,
  ];
}

type PaginationFilters = {
  limit: number;
  offset?: number;
};

export function getPaginationFilters(
  currentPage: number,
  limit: number
): PaginationFilters {
  return currentPage > 0
    ? {
        limit,
        offset: (currentPage - 1) * limit,
      }
    : { limit };
}

export function generatePaginatedSearchParams(
  page: number,
  searchParams: URLSearchParams
) {
  const params = new URLSearchParams(searchParams);
  params.set("page", page.toString());

  return "?" + params.toString();
}

export function convertPageStringToInteger(
  currentPage: string | null | undefined
) {
  const page = Math.floor(Number(currentPage));
  return !Number.isSafeInteger(page) || page < 1 ? 1 : page;
}
