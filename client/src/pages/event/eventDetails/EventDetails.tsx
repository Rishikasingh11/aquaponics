import { Event } from "@/components/common/eventCard/EventCards";
import { Button } from "@/components/ui/button";
import { useEventDetails } from "@/hooks/eventHooks";
import { FaShare } from "react-icons/fa6";
import { useParams } from "react-router-dom";

const EventDetails: React.FC = () => {
  const params = useParams();
  const slug = params.slug as string;
  const { eventDetails, error } = useEventDetails(slug);

  // Here we are asserting that eventDetails is of type Event | null
  const Event = eventDetails as Event | null;
  console.log(Event)

  if (error) return <div>Failed to load event details</div>;

  return (
    <>
      {/* <!-- Blog Article --> */}
      <div className="max-w-7xl px-4 pt-6 lg:pt-10 pb-12 sm:px-6 lg:px-8 mx-auto">
        <div className="w-full">
          {/* <!-- Content --> */}
          <div className="space-y-5 md:space-y-8">
            <div className="space-y-3">
              <h1 className="text-2xl font-bold md:text-3xl dark:text-white">
                {Event?.name}
              </h1>
              {Event?.description}
              <figure>
                <img
                  className="w-full object-cover rounded-xl"
                  src={Event?.thumbnailUrl}
                  alt="Image Description"
                />
                {Event?.thumbnailUrl}
              </figure>
            </div>
            {/* <!-- End Content --> */}
          </div>
        </div>
        {/* <!-- End Blog Article --> */}

        {/* <!-- Sticky Share Group --> */}
        <div className="sticky bottom-6 inset-x-0 text-center">
          <div className="inline-block">
            <div className="flex items-center gap-x-1.5">
              {/* <!-- Button --> */}
              <div className="relative inline-flex">
                <Button
                  variant="default"
                  className="flex items-center text-sm rounded-full"
                >
                  Share&nbsp;
                  <FaShare className="size-3.5" />
                </Button>
              </div>
              {/* <!-- Button --> */}
            </div>
          </div>
        </div>
      </div>
      {/* <!-- End Sticky Share Group --> */}
    </>
  );
};

export default EventDetails;
