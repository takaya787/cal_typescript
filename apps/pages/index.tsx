import { useContext } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
//components
import { Modal } from '../components/Modal'
import { Main } from '../components/Main'
//others
import { Auth } from '../modules/auth'
import { UserContext } from '../pages/_app';

const Home: React.FC = () => {
  const { user, setUser } = useContext(UserContext);

  //Logout時の処理をまとめる
  const handleLogout = (): void => {
    setUser({ email: '', id: 0, name: '' });
    Auth.logout();
    console.log('You are logged out successfully')
  }
  return (
    <div className={styles.container}>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta charSet="UTF-8" />
        <title>Your Schedule</title>
      </Head>
      <h1 className={styles.title}>カレンダーでスケジュール管理！</h1>
      {!Auth.isLoggedIn() && (
        <Modal />
      )}
      {Auth.isLoggedIn() && (
        <>
          <p>Welcome {user.name}!</p>
          <button onClick={handleLogout}>Log out</button>
        </>
      )}
      <Main />
    </div>
  )
}
export default Home;
