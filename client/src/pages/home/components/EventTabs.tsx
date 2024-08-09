import EventCardsSkeleton from "@/components/common/eventCard/EventCardsSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Suspense, lazy } from "react";

// Use React.lazy to import EventCard
const EventCards = lazy(
  () => import("../../../components/common/eventCard/EventCards")
);

const EventTabs: React.FC = () => {
  return (
    <>
      {/* TABS START HERE */}
      <div className="flex justify-center p-5">
        <Tabs defaultValue="upcoming" className="w-[1024px]">
          <TabsList className="grid w-full grid-cols-3 bg-primary dark:bg-primary text-neutral-900">
            <TabsTrigger value="past">Past Events</TabsTrigger>
            <TabsTrigger value="ongoing">Ongoing Events</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          </TabsList>
          <Suspense fallback={<EventCardsSkeleton/>}>
            <TabsContent value="past">
              <EventCards eventType="past" />
            </TabsContent>
          </Suspense>
          <Suspense fallback={<EventCardsSkeleton/>}>
            <TabsContent value="ongoing">
              <EventCards eventType="ongoing" />
            </TabsContent>
          </Suspense>
          <Suspense fallback={<EventCardsSkeleton/>}>
            <TabsContent value="upcoming">
              <EventCards eventType="upcoming" />
            </TabsContent>
          </Suspense>
        </Tabs>
      </div>
      {/* TABS END HERE */}
    </>
  );
};

export default EventTabs;
