import React, { useState, useContext } from 'react'
import { mutate } from 'swr';
//others
import { Each_task } from '../../types/TaskType'
import { Auth } from '../../modules/auth'
import { TasksContext } from '../Main'
import styles from './TaskList.module.css'

type TaskEachProps = {
  id: number,
  date: number,
  title: string,
  memo: string,
  completed: boolean
}
export const TaskEach: React.FC<TaskEachProps> = ({ id, date, title, memo, completed }) => {
  //memo情報を表示するか決定
  const [showMemo, setShowMemo] = useState<boolean>(false);
  const { TasksUrl } = useContext(TasksContext);

  //memo partの長さを調整するclass
  const each_style = (): string => {
    return showMemo ? `${styles.list_each} ${styles.longer}` : `${styles.list_each}`
  }

  //switch titleを変数化
  const switch_title = (): string => {
    return showMemo ? '詳細閉じる' : '詳細確認'
  }

  //switchの色を変更する
  const switch_style = (): string => {
    return showMemo ? `${styles.list_switch} ${styles.blue}` : `${styles.list_switch}`
  }

  //taskバーの色分けを簡略化
  const task_line: React.FC<boolean> = (completed) => {
    if (completed) {
      return (<div className={`${styles.task_line} ${styles.blue}`}></div>)
    } else {
      return (<div className={`${styles.task_line} ${styles.red}`}></div>)
    }
  }

  // deleteを送信する非同期関数　premiseを返す
  async function DeleteTask(id: number): Promise<Each_task> {
    const delete_url = `${TasksUrl}/${id}`
    const res = await fetch(delete_url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Auth.getToken()}`
      }
    })
    const data = await res.json();
    return data;
  }

  // eventを削除する一連の関数
  const handleDelete = (id: number): void => {
    DeleteTask(id)
      .then(data => {
        console.log(data);
        mutate(TasksUrl);
      })
      .catch(err => {
        console.log(err);
      })
  }

  // taskを変更する一連の関数 promiseを返す
  async function ChangeTask(id: number): Promise<Each_task> {
    const target_url = `${TasksUrl}/change/${id}`
    const res = await fetch(target_url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Auth.getToken()}`
      }
    })
    const data = await res.json();
    return data;
  }

  //taskの切り替えボタンの関数 id: integer
  const handleChange = (id: number): void => {
    ChangeTask(id)
      .then(data => {
        // console.log(data);
        mutate(TasksUrl);
      })
      .catch(err => {
        console.log(err);
      })
  }
  return (
    <div className={each_style()}>
      {task_line(completed)}
      {/* <button className={styles.change_button} onClick={() => handleChange(props.id)}>切り替え</button> */}
      <div>
        <span className={styles.list_date}>{date}日</span>
        <button className={switch_style()} onClick={() => setShowMemo(!showMemo)}>{switch_title()}</button>
        <button className={styles.change_button} onClick={() => handleChange(id)}>切り替え</button>
        <button className={styles.delete_button} onClick={() => handleDelete(id)}>削除</button>
        <br />{title}
        <br />
        {showMemo && (
          <div className={styles.memo}>
            <h3>メモ内容</h3>
            <p>{memo}</p>
          </div>
        )}
      </div>
    </div>
  )
}
