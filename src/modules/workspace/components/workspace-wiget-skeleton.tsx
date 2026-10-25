import { Skeleton } from "@/shared/components/skeleton";

export const WorkspacesWigetSkeleton = () => {
  return (
    <div className="bg-accent mt-10 flex max-h-48 flex-col rounded-lg px-2 py-3">
      <Skeleton className="text-3xs ml-1 h-3 w-20" />
      <Skeleton className="text-4xs ml-1 mt-1 h-2.5 w-28" />
      <ul className="border-border mx-4 mt-3 flex max-h-16 min-h-2 min-w-0.5 translate-x-px flex-col gap-1 border-l px-2 py-0.5">
        {[...Array(3)].map((_, index) => (
          <li key={index} className="inline-flex h-7 w-full items-center gap-1.5 px-2">
            <Skeleton className="mb-0.5 size-1.5 shrink-0 rounded-full" />
            <Skeleton className="h-2.5 w-24" />
          </li>
        ))}
      </ul>
      <Skeleton className="mt-2 h-7 w-full rounded-md" />
    </div>
  );
};
