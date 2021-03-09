import useSWR from 'swr';
//others
import { Auth } from '../modules/auth'
import { Tasks_data } from '../types/TaskType'

export const TasksUrl = `${process.env.API_ENDPOINT}tasks`

//SWR用のfetcher
async function Tasksfetcher(): Promise<Tasks_data | null> {
  const response = await fetch(TasksUrl, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${Auth.getToken()}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json()
}

export const useTasksSWR = () => {
  const { data: tasks_data, error: tasks_error } = useSWR(TasksUrl, Tasksfetcher)
  return { tasks_data, tasks_error }
}
