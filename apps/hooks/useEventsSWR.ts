import useSWR from 'swr';
//others
import { Auth } from '../modules/auth'
import { Events_data } from '../types/EventType'

export const EventsUrl = `${process.env.API_ENDPOINT}events`

//SWR用のfetcher
// const Eventfetcher = () => fetch(EventsUrl, {
//   method: 'GET',
//   headers: {
//     'Authorization': `Bearer ${Auth.getToken()}`,
//     'Content-Type': 'application/json'
//   }
// }).then(res => res.json())
async function Eventsfetcher(): Promise<Events_data | null> {
  const response = await fetch(EventsUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${Auth.getToken()}`,
      'Content-Type': 'application/json'
    }
  });

  return response.json()
}

export const useEventsSWR = () => {
  // SWRはSuspence optionで型付けが可能
  // const { data: events_data, error: events_error } = useSWR(EventsUrl, Eventfetcher, { suspense: true }) as Events_SWR_type;

  const { data: events_data, error: events_error } = useSWR(EventsUrl, Eventsfetcher)
  return { events_data, events_error }
}
