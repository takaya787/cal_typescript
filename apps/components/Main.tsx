import React, { useState, useEffect, createContext } from 'react'
import Calender from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import styles from './Main.module.css'
// Hooks
import { useEventsSWR, EventsUrl } from '../hooks/useEventsSWR'
//types
import { Events_Context } from '../types/EventType'

export const EventsContext = createContext({} as Events_Context);

export const Main: React.FC = () => {
  //react-calendar用のstate
  const [value, onChange] = useState<Date>(new Date());
  const [activeDate, setActiveDate] = useState<Date>(new Date());

  //ユーザーの全てのeventを取得する
  const { events_data, events_error } = useEventsSWR()
  const Eventsvalue = {
    events_data, events_error, EventsUrl
  };
  return (
    <>
      <Calender
        className={styles.main}
        onChange={onChange}
        // onClickDay={(value, event) => {
        //   setIsEventForm(true);
        // }}
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
        <div>events</div>
      </EventsContext.Provider>
    </>
  )
}
