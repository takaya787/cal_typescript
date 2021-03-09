import React, { useState, useEffect, useContext } from 'react'
import styles from './EventList.module.css'
//components
import { EachList } from '../Lists/EventEach'
//others
import { EventsContext } from '../../components/Main'
//type
import { Each_event } from '../../types/EventType'
type EventListProps = {
  activeDate: Date
}

export const EventList: React.FC<EventListProps> = ({ activeDate }) => {
  const { events_data } = useContext(EventsContext);
  //実際に表示するeventsを選定
  const [actualEvents, setActualEvents] = useState<Each_event[]>([])
  const active_year = activeDate.getFullYear()
  const active_month = activeDate.getMonth() + 1

  //日付を確認用のコード
  const today = new Date()
  //eventの日付と今日の日付を比べて、過去かどうかを調べる
  const list_class = (today: Date, target_date: Number, target_month: Number, target_year: Number): string => {
    const today_date = today.getDate()
    const today_month = today.getMonth() + 1
    const today_year = today.getFullYear()
    //yearが小さい　過去
    if (today_year > target_year) {
      return `${styles.past}`
    }
    //yearが同じでもmonthが小さい　過去
    else if (today_year === target_year && today_month > target_month) {
      return `${styles.past}`
    }
    //year,month同じでもdateが小さい　過去
    else if (today_year === target_year && today_month === target_month) {
      return today_date > target_date ? ` ${styles.past}` : 'normal'
    } else {
      return 'normal'
    }
  }

  //表示するeventsを決定
  useEffect(function () {
    //events_dataに値がセットされていなければ、return
    if (events_data === undefined || events_data === null) {
      return
    } else if (!events_data.hasOwnProperty('events')) {
      return
    }
    console.log(events_data)
    const events = events_data.events
    const filteredevents = events.filter((event) => {
      return (event.month === active_month && event.year === active_year)
    })
    setActualEvents(filteredevents)

  }, [activeDate, events_data])

  return (
    <>
      <h3 className={styles.title}>予定一覧　{active_year}年 {active_month}月 </h3>
      <div className={styles.eventlist}>
        <ul className={styles.lists}>
          {actualEvents.map(event => (
            <li key={event.id} className={list_class(today, event.date, event.month, event.year)}><EachList date={event.date} title={event.title} memo={event.memo} id={event.id} /></li>
          ))}
        </ul>
      </div>
    </>
  )
}
