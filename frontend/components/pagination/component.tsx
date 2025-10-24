import { useSearchParams } from "next/navigation";
import * as PaginationPrimitives from "@/components/ui/pagination";
import { createPagination, generatePaginatedSearchParams } from "./utils";

type PaginationProps = {
  url: string;
  totalPages: number;
  currentPage: number;
};

export const Pagination = ({
  url,
  totalPages,
  currentPage,
}: PaginationProps) => {
  const searchParams = useSearchParams();
  const pages = createPagination({ totalPages, currentPage });

  return totalPages > 0 ? (
    <PaginationPrimitives.Pagination className="py-3 px-5 overflow-x-auto block">
      <PaginationPrimitives.PaginationContent className="w-fit m-auto">
        <PaginationPrimitives.PaginationItem>
          <PaginationPrimitives.PaginationPrevious
            shallow={true}
            href={
              url +
              generatePaginatedSearchParams(
                currentPage > totalPages ? totalPages : currentPage - 1,
                searchParams
              )
            }
            disabled={currentPage <= 1}
          />
        </PaginationPrimitives.PaginationItem>
        {pages.map((page) =>
          typeof page === "string" ? (
            <PaginationPrimitives.PaginationItem key={page}>
              <PaginationPrimitives.PaginationEllipsis />
            </PaginationPrimitives.PaginationItem>
          ) : (
            <PaginationPrimitives.PaginationItem key={page}>
              <PaginationPrimitives.PaginationLink
                shallow={true}
                href={url + generatePaginatedSearchParams(page, searchParams)}
                isActive={page === currentPage}
              >
                {page}
              </PaginationPrimitives.PaginationLink>
            </PaginationPrimitives.PaginationItem>
          )
        )}
        <PaginationPrimitives.PaginationItem>
          <PaginationPrimitives.PaginationNext
            shallow={true}
            href={
              url + generatePaginatedSearchParams(currentPage + 1, searchParams)
            }
            disabled={currentPage >= totalPages}
          />
        </PaginationPrimitives.PaginationItem>
      </PaginationPrimitives.PaginationContent>
    </PaginationPrimitives.Pagination>
  ) : null;
};
