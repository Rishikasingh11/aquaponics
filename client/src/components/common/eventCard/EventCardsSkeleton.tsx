import { Skeleton } from "@/components/ui/skeleton";

const EventCardsSkeleton = () => {
  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* <!-- Grid --> */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6)
          .fill(null)
          .map((_, index) => (
            // Card Start
            <div key={index} className="group flex flex-col h-full">
              <Skeleton className="h-52 flex flex-col justify-center items-center rounded-t-xl" />
              <div className="pt-4 pb-4 md:pt-6 md:pb-6">
                <Skeleton className="block mb-3 h-4 w-[244px]" />
                <Skeleton className="h-7 mb-3 w-[200px]" />
                <Skeleton className="mt-3 h-4 w-full" />
              </div>
              <div className="mt-auto flex space-x-1">
                <Skeleton className="w-full h-9 py-3 px-4 inline-flex justify-center items-center gap-x-2" />
                <Skeleton className="w-full h-9 py-3 px-4 inline-flex justify-center items-center gap-x-2" />
              </div>
            </div>
            //   Card End
          ))}
      </div>
      {/* End Grid */}
    </div>
  );
};

export default EventCardsSkeleton;
