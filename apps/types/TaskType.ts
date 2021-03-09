type each_task = {
  id: number,
  title: string,
  memo?: string,
  completed: boolean,
  year: number,
  month: number,
  date: number,
  user_id: number,
  created_at: TimeRanges,
  updated_at: TimeRanges
}
export type Tasks_data = {
  tasks: each_task[]
}

export type Tasks_Context = {
  tasks_data: Tasks_data,
  tasks_error: string,
  TasksUrl: string
}
