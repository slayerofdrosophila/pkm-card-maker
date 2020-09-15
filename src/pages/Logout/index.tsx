import { faSignOutAlt, faUndo } from '@fortawesome/free-solid-svg-icons';
import Button from 'components/FormElements/Button';
import Motion from 'pages/Motion';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from 'redux/ducks/user/actions';
import styles from './Logout.module.scss';

const LogoutPage: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const doLogout = () => {
    dispatch(logout());
  }

  const goBack = () => {
    history.goBack();
  }

  return (
    <Motion>
      <div className={styles.wrapper}>
        <h2>Do you really want to log out?</h2>
        <div className={styles.buttons}>
          <Button className={styles.button} icon={faSignOutAlt} onClick={doLogout}>Yes, log me out</Button>
          <Button className={styles.button} icon={faUndo} onClick={goBack}>No, stay logged in</Button>
        </div>
      </div>
    </Motion>
  )
}

export default LogoutPage;
