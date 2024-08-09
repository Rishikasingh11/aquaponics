import { Suspense, lazy } from "react";
import EventHero from "./components/EventHero";
import EventCardsSkeleton from "@/components/common/eventCard/EventCardsSkeleton";

// Use React.lazy to import EventCards
const EventCards = lazy(() => import("@/components/common/eventCard/EventCards"));

const Events = () => {
  return (
    <>
      <EventHero/>
      <Suspense fallback={<EventCardsSkeleton/>}>
        <EventCards eventType="all"/>
      </Suspense>
    </>
  );
};

export default Events;
