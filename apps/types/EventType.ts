type each_event = {
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

type Events_data = each_event[]

export type Events_SWR_type = {
  data: Events_data,
  error: string
}
