import React, { useState, useEffect, useContext } from 'react'
import styles from './TaskList.module.css'
//components
import { TaskEach } from './TaskEach'
//types
import { Each_task, Tasks_filter } from '../../types/TaskType'
//others
import { TasksContext } from '../../components/Main'

type TaskListProps = {
  activeDate: Date
}

export const TaskList: React.FC<TaskListProps> = ({ activeDate }) => {
  //APIから得られたdataの配列を取り出す必要はある
  const { tasks_data } = useContext(TasksContext);

  //taskのfilterを管理
  const [taskfilter, setTaskfilter] = useState<Tasks_filter>('ALL');
  //カレンダーの月から始まるtasksを選別する
  const [currentTasks, setCurrentTasks] = useState<Each_task[]>([])
  //実際に表示するeventsを選定
  const [actualTasks, setActualTasks] = useState<Each_task[]>([])

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

  //ここで、tasks_dataからカレンダーの月に該当するタスクを取得
  useEffect(function () {
    //tasks_dataに値がセットされていなければ、return
    if (tasks_data === undefined || tasks_data === null) {
      return
    } else if (!tasks_data.hasOwnProperty('tasks')) {
      return
    }

    const tasks = tasks_data.tasks
    const Current_Tasks = tasks.filter((task) => {
      return (task.month === active_month && task.year === active_year)
    })
    setCurrentTasks(Current_Tasks)
  }, [activeDate, tasks_data])

  // currentTasksから実際に表示するタスクを選択
  useEffect(function () {
    //currentTasksに値がセットされていなければ、return
    if (currentTasks.length === 0) {
      setActualTasks([])
    }
    let Filtered_Tasks: Each_task[] = []
    switch (taskfilter) {
      case "TASKS":
        Filtered_Tasks = currentTasks.filter((task) => {
          return (task.completed === false)
        })
        break;
      case "COMPLETED":
        Filtered_Tasks = currentTasks.filter((task) => {
          return (task.completed === true)
        })
        break;
      default:
        Filtered_Tasks = currentTasks
        break;
    }
    setActualTasks(Filtered_Tasks)
  }, [currentTasks, taskfilter])

  //選択したボタンのデザインを目立たせるclassを付与する
  const button_selected = (name: string): string => {
    if (taskfilter === name) {
      return (`${styles.task_button_selected}`)
    } else {
      return ""
    }
  }

  return (
    <>
      <h3 className={styles.title}>タスク一覧　{active_year}年 {active_month}月 </h3>
      <div className={styles.eventlist}>
        <div className={styles.task_buttons}
        >
          <button className={`${styles.task_button} ${styles.green} ${button_selected("ALL")}`} onClick={() => setTaskfilter("ALL")}>All</button>
          <button className={`${styles.task_button} ${styles.red} ${button_selected("TASKS")}`} onClick={() => setTaskfilter("TASKS")}>Tasks</button>
          <button className={`${styles.task_button} ${styles.blue} ${button_selected("COMPLETED")}`} onClick={() => setTaskfilter("COMPLETED")}>Completed</button>
        </div>
        <ul className={styles.lists}>
          {actualTasks.map(task => (
            <li key={task.id} className={list_class(today, task.date, task.month, task.year)}><TaskEach date={task.date} title={task.title} memo={task.memo} id={task.id} completed={task.completed} /></li>
          ))}
        </ul>
      </div>
    </>
  )
}
