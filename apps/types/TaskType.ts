export type Each_task = {
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
  tasks: Each_task[]
}

export type Tasks_Context_Value = {
  tasks_data: Tasks_data | undefined | null,
  tasks_error: string | undefined,
  TasksUrl: string
}

export type Tasks_filter = 'ALL' | 'TASKS' | 'COMPLETED'
