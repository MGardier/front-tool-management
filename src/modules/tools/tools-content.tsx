import { Wrench } from "lucide-react";
import clsx from "clsx";

import { ErrorState } from "@/shared/components/error/error-state";
import { EmptyState } from "@/shared/components/empty-state";
import { ToolsList } from "@/shared/components/tools-list/tools-list";
import { ToolsListSkeleton } from "@/shared/components/tools-list/tools-list-skeleton";
import { Pagination } from "@/shared/components/pagination";
import type { ToolSort } from "@/shared/components/tools-list/types";
import type { Paginated } from "@/shared/types/api.types";
import type { Tool } from "@/lib/api/tools/tools.schema";

interface IToolsContentProps {
  isLoading: boolean;
  isError: boolean;
  isRefreshing: boolean;
  hasData: boolean;
  activeFilterCount: number;
  paginated: Paginated<Tool> | undefined;
  sort: ToolSort;
  page: number;
  limit: number;
  onSortChange: (sort: ToolSort) => void;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
  onRetry: () => void;
  isFetching: boolean;
}

export const ToolsContent = ({
  isLoading,
  isError,
  isRefreshing,
  hasData,
  activeFilterCount,
  paginated,
  sort,
  page,
  limit,
  onSortChange,
  onPageChange,
  onLimitChange,
  onRetry,
  isFetching,
}: IToolsContentProps) => {
  if (isLoading) {
    return <ToolsListSkeleton rows={limit > 10 ? 10 : limit} />;
  }

  if (isError) {
    return (
      <ErrorState
        title="Couldn't load tools"
        description="We couldn't fetch the tools list. Please try again."
        onRetry={onRetry}
        isRetrying={isFetching}
      />
    );
  }

  if (!hasData) {
    return (
      <EmptyState
        icon={Wrench}
        title="No tools match your filters"
        description={
          activeFilterCount > 0
            ? "Try removing some filters or adjusting your search."
            : "No tools to display."
        }
      />
    );
  }

  return (
    <div
      className={clsx(
        "transition-opacity",
        isRefreshing && "pointer-events-none opacity-60",
      )}
      aria-busy={isRefreshing}
    >
      <ToolsList tools={paginated!.data} sort={sort} onSortChange={onSortChange} />
      <Pagination
        page={page}
        limit={limit}
        total={paginated!.total}
        onPageChange={onPageChange}
        onLimitChange={onLimitChange}
      />
    </div>
  );
};