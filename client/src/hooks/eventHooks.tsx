import useSWR from 'swr';
import { fetcher } from '@/services/api';

export const useEvents = (eventType: string, limit = 10, offset = 0) => {
  const { data: events, error } = useSWR(`/events?type=${eventType}&limit=${limit}&offset=${offset}`, fetcher, { suspense: true });
  return { events, error };
};

export const useEventDetails = (slug: string) => {
  const { data: eventDetails, error } = useSWR(`/event/${slug}`, fetcher);
  return { eventDetails, error };
};