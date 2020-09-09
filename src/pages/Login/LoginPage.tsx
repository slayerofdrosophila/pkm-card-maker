import React from 'react';
import styles from './Login.module.scss';
import computerSvg from './computer.svg';

const LoginPage: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <img className={styles.computer} src={computerSvg} />
    </div>
  )
}

export default LoginPage;
