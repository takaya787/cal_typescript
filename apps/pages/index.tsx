import Head from 'next/head'
import styles from '../styles/Home.module.css'
//others
import { Auth } from '../modules/auth'

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta charSet="UTF-8" />
        <title>Your Schedule</title>
      </Head>
      <h1 className={styles.title}>カレンダーでスケジュール管理！</h1>
      {!Auth.isLoggedIn() && (
        // <Modal />
        <p>not login</p>
      )}
      {Auth.isLoggedIn() && (
        <>
          {/* <p>Welcome {user.name}!</p>
          <button onClick={handleLogout}>Log out</button> */}
        </>
      )}

    </div>
  )
}
export default Home;
