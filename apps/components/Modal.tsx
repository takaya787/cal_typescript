import React, { useState } from "react";
import styles from './Modal.module.css';
//components
import { LoginForm } from './Forms/LoginForm'

export const Modal: React.FC = () => {
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  //formの開け締めを管理する
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const Closemodal = (): void => {
    setIsSignup(false);
    setIsLogin(false);
    setIsOpen(false);
  }
  const Signupcontroll = (): void => {
    setIsSignup(!isSignup);
    setIsLogin(false);
    setIsOpen(true);
  }
  const Logincontroll = (): void => {
    setIsSignup(false);
    setIsLogin(!isLogin);
    setIsOpen(true);
  }
  return (
    <>{/* 始めはボタンが表示される */}
      { !isOpen &&
        (<button onClick={Signupcontroll} className={styles.initial}>カレンダーを始める！</button>)
      }

      {/* Sign up用のformが表示される */}
      { isOpen &&
        (<div className={styles.modal}>
          <div className={styles.content}>
            <button className={styles.content_close} onClick={Closemodal}>×</button>
            {/* signup用のformが表示される */}
            {isSignup && (
              <>
                <h2 className={styles.content_title}>ユーザー登録！</h2>
                {/* <UserForm /> */}
                <button className={styles.content_switch} onClick={Logincontroll}>ログインはこちら</button>
              </>
            )}
            {/* Login用のformが表示される */}
            {isLogin && (
              <>
                <h2 className={styles.content_title}>Log inはこちら！</h2>
                <LoginForm Closemodal={Closemodal} />
                <button className={styles.content_switch} onClick={Signupcontroll}>ユーザー登録はこちら</button>
              </>
            )}
          </div>
        </div>
        )
      }
    </>
  )
}
