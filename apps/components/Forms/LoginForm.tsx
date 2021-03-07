import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Auth } from '../../modules/auth'
//types
import { LoginValueType, UserLoginType } from '../../types/UserType'
//othres
import { UserContext } from '../../pages/_app';


import styles from './UserForm.module.css';

//APIの送信先
const endpoint = process.env.API_ENDPOINT + 'login'

type LoginFormProps = {
  Closemodal: void
}

export function LoginForm(props) {
  const { register, handleSubmit } = useForm();
  const initialerrors = { name: '', email: '', password: '', password_confirmation: '' };

  //_appからcontextsを受け取る
  const { setUser } = useContext(UserContext);

  const onSubmit = (value: LoginValueType): void => {
    console.log('raw data')
    console.log(value);
    fetch(endpoint, {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: value.email,
        password: value.password,
      }),
    })
      .then(response => response.json())
      .then((data): UserLoginType => {
        console.log('response data')
        console.log(data);
        if (data.error) {
          // console.log(data.error);
          alert(data.error);
          props.Closemodal()
          return
        }
        // console.log(data.token);
        console.log('Logined successfully');
        //Login関連の処理 context使用
        Auth.login(data.token);
        const user_data = data.user
        setUser({ id: user_data.id, email: user_data.email, name: user_data.name });
        props.Closemodal()
        //Login関連の処理 終了
        // resetError();
        // mutate(baseUrl);
        // router.push('/reviews/new');
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.label} htmlFor="email">Eメール</label>
      <input
        id="email"
        className={styles.form_input}
        name="email"
        type="email"
        ref={register({ required: 'emailは必須です' })}
      />
      <label className={styles.label} htmlFor="password">パスワード</label>
      <input
        id="password"
        className={styles.form_input}
        type="password"
        name="password"
        ref={register({ required: 'passwordは必須です' })}
      />
      <button type="submit" className={styles.form_submit}>ログイン</button>
    </form>
  )
}
