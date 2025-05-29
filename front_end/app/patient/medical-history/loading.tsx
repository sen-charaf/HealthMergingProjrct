import { Skeleton } from "@/components/ui/skeleton";

export default function MedicalHistoryLoading() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-48" />
        </div>
        <Skeleton className="h-10 w-40" />
      </div>
      
      <Skeleton className="h-[500px] w-full rounded-lg" />
    </div>
  );
}