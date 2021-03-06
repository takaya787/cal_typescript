//FetchEventの型
export type Each_event = {
  id: number,
  title: string,
  memo?: string,
  year: number,
  month: number,
  date: number,
  user_id: number,
  created_at: TimeRanges,
  updated_at: TimeRanges
}
export type Events_data = {
  events: Each_event[]
}

//SWR通信で用いるEVENTの型
// export type Events_SWR_type = {
//   data: Events_data,
//   error: string
// }

//Event Contextの型
export type Events_Context_Value = {
  events_data: Events_data | undefined | null,
  events_error: string | undefined,
  EventsUrl: string
}
