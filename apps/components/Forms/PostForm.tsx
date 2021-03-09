import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
//others
import { EventsContext } from '../Main'
import styles from './PostForm.module.css'
import { Auth } from '../../modules/auth'

type PostFormProps = {
  props_date: Date,
  setIsPostForm: (bool: boolean) => void
}

type PostFormValue = {
  title: string,
  memo?: string
}

export const PostForm: React.FC<PostFormProps> = ({ props_date, setIsPostForm }) => {
  //始めは、ここをtrueにして、eventformを表示する
  const [defaultEvent, setDefaultEvent] = useState<boolean>(true);

  const { register, handleSubmit } = useForm();
  //それぞれのエンドポイントを取得しておく
  const { EventsUrl } = useContext(EventsContext);
  // const { TasksUrl } = useContext(TasksContext);

  //Event投稿関数
  const EventSubmit = (value: PostFormValue): void => {
    if (!Auth.isLoggedIn()) {
      return alert('loginしてください')
    }
    // console.log(value);
    fetch(EventsUrl, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify({
        event: {
          title: value.title,
          memo: value.memo,
          //日付が一日ずれるので + 1しないといけない
          year: props_date.getFullYear(),
          month: props_date.getMonth() + 1,
          date: props_date.getDate(),
        },
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        //swrによりeventsを更新
        mutate(EventsUrl)
        //送信後にformを閉じる
        setIsPostForm(false)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  //曜日を作成
  const day_label: React.FC<Date> = (target_date) => {
    let day = ''
    switch (target_date.getDay()) {
      case 0:
        day = '(日)'
        break
      case 1:
        day = '(月)'
        break;
      case 2:
        day = '(火)'
        break;
      case 3:
        day = '(水)'
        break;
      case 4:
        day = '(木)'
        break;
      case 5:
        day = '(金)'
        break;
      default:
        day = '(土)'
    }
    return (<>{day}</>)
  }

  //日付を作成　getMonth()は0~11なので、+1必要
  const date_label: React.FC<Date> = (target_date) => {
    return (<> 登録日： { target_date.getFullYear()}年 { target_date.getMonth() + 1}月{ target_date.getDate()}日</>)
  }

  return (
    <>
      <div className={styles.draft}>
        {/* trueならevent送信form */}
        {defaultEvent && (
          <form
            className={styles.form}
            onSubmit={handleSubmit(EventSubmit)}
          >
            <button className={styles.switch} onClick={() => { setDefaultEvent(false) }}>タスクを作成</button>
            <button className={styles.button} onClick={() => { setIsPostForm(false) }}>✕</button>
            <h3 className={styles.form_title}>予定を登録</h3>
            <label className={styles.form_label}>  {date_label(props_date)} {day_label(props_date)}
            </label>
            <label className={styles.form_label} htmlFor="title">タイトル<span className="required">＊必須</span></label>
            <input type="input" name="title" id="title"
              className={styles.form_input}
              ref={register({ required: 'タイトルは必須です' })}
            />

            <label htmlFor="memo" className={styles.form_label}>メモ</label>
            <textarea name="memo" id="memo" className={`${styles.form_input} ${styles.textarea}`} ref={register()} placeholder="メモはご自由に入力してください" />

            <input type="submit" value="予定を送信" className={styles.form_submit} />
          </form>
        )}
        {!defaultEvent && (
          <form
            className={styles.form}
          // onSubmit={handleSubmit(TaskSubmit)}
          >
            <button className={styles.switch} onClick={() => { setDefaultEvent(true) }}>予定を登録</button>
            <button className={styles.button} onClick={() => { setIsPostForm(false) }}>✕</button>
            <h3 className={styles.form_title}>タスクを作成</h3>
            <label className={styles.form_label}>  {date_label(props_date)} {day_label(props_date)}
            </label>
            <label className={styles.form_label} htmlFor="title">タイトル<span className="required">＊必須</span></label>
            <input type="input" name="title" id="title"
              className={styles.form_input}
              ref={register({ required: 'タイトルは必須です' })}
            />

            <label htmlFor="memo" className={styles.form_label}>メモ</label>
            <textarea name="memo" id="memo" className={`${styles.form_input} ${styles.textarea}`} ref={register()} placeholder="メモはご自由に入力してください" />

            <input type="submit" value="タスクを作成" className={styles.form_submit} />
          </form>
        )}

      </div>
    </>
  )
}
