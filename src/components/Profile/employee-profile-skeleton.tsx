import { Skeleton } from "../ui/skeleton";

export default function EmployeeProfileSkeleton() {
  const skeletonItems = Array.from({ length: 12 });

  return (
    <div className="p-4">
      <Skeleton className="flex flex-col items-center space-y-6 mb-6 pt-6">
        <Skeleton className="w-24 h-24 rounded-full" />
        <div className="text-center space-y-2 flex flex-col justify-center items-center mb-4 p-4">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-6 w-28" />
          <Skeleton className="h-6 w-44" />
          <Skeleton className="h-6 w-6" />
        </div>
      </Skeleton>
      <Skeleton className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
        {skeletonItems.map((_, index) => (
          <Skeleton key={index} className="h-12 w-full" />
        ))}
      </Skeleton>
      <Skeleton className="h-12 w-36 mt-6 mx-auto" />
    </div>
  );
}
