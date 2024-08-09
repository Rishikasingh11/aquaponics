import { FaTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useEvents } from '@/hooks/eventHooks';

export interface Event {
  id: number;
  name: string;
  description: string;
  thumbnailUrl: string;
  startingDate: Date;
  endingDate: Date;
  type: string;
  location: string;
  slug: string;
  maxAttendees: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventCardProps {
  eventType?: "past" | "ongoing" | "upcoming" | "all";
}

const EventCards: React.FC<EventCardProps> = ({ eventType = 'all'}) => {
  
  const { events, error } = useEvents(eventType);

  if (error) return <div>Failed to load events</div>
  if (!events) return <div>Loading...</div>

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      {/* <!-- Grid --> */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event: Event) => (
          // Card Start
          <div
            key={event.id}
            className="group flex flex-col h-full bg-white border border-gray-200 shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70"
          >
            <div className="h-52 flex flex-col justify-center items-center bg-blue-600 rounded-t-xl">
              <FaTwitter className="size-28" />
            </div>
            <div className="p-4 md:p-6">
              <span className="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-500">
                {event.location}
              </span>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-neutral-300 dark:hover:text-white">
                {event.name}
              </h3>
              <p className="mt-3 text-gray-500 dark:text-neutral-500">
                {event.description}
              </p>
            </div>
            <div className="mt-auto flex border-t border-gray-200 divide-x divide-gray-200 dark:border-neutral-700 dark:divide-neutral-700">
              <a
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-es-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                href="#"
              >
                Buy Ticket
              </a>
              <Link
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-ee-xl bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                to={`/event/${event.slug}`}
              >
                Check Event
              </Link>
            </div>
          </div>
          //   Card End
        ))}
      </div>
      {/* End Grid */}
    </div>
  );
};

export default EventCards;
