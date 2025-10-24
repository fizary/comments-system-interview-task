import { useSearchParams } from "next/navigation";
import { convertPageStringToInteger } from "./utils";

export function useCurrentPage() {
  const searchParams = useSearchParams();
  return convertPageStringToInteger(searchParams.get("page"));
}
