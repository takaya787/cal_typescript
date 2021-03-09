import React, { useState, useContext } from 'react'
import { mutate } from 'swr';
//others
import { Auth } from '../../modules/auth'
import { EventsContext } from '../../components/Main'
import styles from './EventList.module.css'

type EachListProps = {
  id: number,
  date: number,
  title: string,
  memo?: string,
}
export const EachList: React.FC<EachListProps> = ({ id, date, title, memo }) => {
  //memo情報を表示するか決定
  const [showMemo, setShowMemo] = useState<boolean>(false);
  const { EventsUrl } = useContext(EventsContext);

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

  // deleteを送信する非同期関数　premiseを返す
  async function DeleteEvent(id: number): Promise<any> {
    const delete_url = `${EventsUrl}/${id}`
    const res = await fetch(delete_url, {
      method: 'DELETE', // or 'PUT'
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
    DeleteEvent(id)
      .then(data => {
        console.log(data);
        mutate(EventsUrl);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className={each_style()}>
      <span className={styles.list_date}>{date}日</span>
      <button className={switch_style()} onClick={() => setShowMemo(!showMemo)}>{switch_title()}</button>
      <button className={styles.delete_button} onClick={() => handleDelete(id)}>削除</button>
      <br />{title}
      <br />

      {showMemo && (
        <>
          <h3 className={styles.memo_title}>メモ内容</h3>
          <p>{memo}</p>
        </>
      )}
    </div>
  )
}
