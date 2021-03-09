import { Suspense } from 'react';
import useSWR from 'swr';
//others
import { Auth } from '../modules/auth'
import { Events_SWR_type } from '../types/EventType'

export const EventsUrl = `${process.env.API_ENDPOINT}events`

//SWR用のfetcher
const Eventfetcher = () => fetch(EventsUrl, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${Auth.getToken()}`,
    'Content-Type': 'application/json'
  }
}).then(res => res.json())

// SWRはSuspence optionで型付けが可能

export const useEventsSWR = () => {
  const { data: events_data, error: event_errors } = useSWR(EventsUrl, Eventfetcher, { suspense: true }) as Events_SWR_type;

  return { events_data, event_errors }
}
