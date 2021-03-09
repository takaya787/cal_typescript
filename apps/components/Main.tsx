import React, { useState, useEffect, createContext } from 'react'
import Calender from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import styles from './Main.module.css'
//components
import { EventList } from '../components/Lists/EventList'
import { PostForm } from '../components/Forms/PostForm'
// Hooks
import { useEventsSWR, EventsUrl } from '../hooks/useEventsSWR'
import { useTasksSWR, TasksUrl } from '../hooks/useTasksSWR'
//types
import { Events_Context_Value } from '../types/EventType'
import { Tasks_Context_Value } from '../types/TaskType'

export const EventsContext = createContext({} as Events_Context_Value);
export const TasksContext = createContext({} as Tasks_Context_Value);

export const Main: React.FC = () => {
  //react-calendar用のstate
  const [value, onChange] = useState<Date>(new Date());
  const [activeDate, setActiveDate] = useState<Date>(new Date());
  //EventForm用のstate
  const [isPostForm, setIsPostForm] = useState(false);


  //ユーザーの全てのeventを取得する
  const { events_data, events_error } = useEventsSWR()
  const Eventsvalue: Events_Context_Value = {
    events_data, events_error, EventsUrl
  };

  //ユーザーの全てのtaskを取得する
  const { tasks_data, tasks_error } = useTasksSWR()
  const Tasksvalue: Tasks_Context_Value = {
    tasks_data, tasks_error, TasksUrl
  };
  return (
    <>
      <Calender
        className={styles.main}
        onChange={() => onChange}
        onClickDay={(): void => {
          setIsPostForm(true);
        }}
        onActiveStartDateChange={({ activeStartDate }) => setActiveDate(activeStartDate)}
        tileClassName={styles.height}
        // tileContent={({ date, view }) => getTileCircle(date, view)}

        value={value}
        showNeighboringMonth={false}
        minDate={new Date(2000, 1, 1)}
        maxDate={new Date(2100, 1, 1)}
        // locale={"ja-JP"}
        view={"month"}
      />
      <EventsContext.Provider value={Eventsvalue}>
        <TasksContext.Provider value={Tasksvalue}>
          {isPostForm && (
            <PostForm props_date={value} setIsPostForm={setIsPostForm} />
          )}
          <div className={styles.board}>
            <div className={styles.inline}>
              <EventList activeDate={activeDate} />
            </div>
          </div>
        </TasksContext.Provider>
      </EventsContext.Provider>
    </>
  )
}
