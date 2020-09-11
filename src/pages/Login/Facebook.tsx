import React, { useRef } from 'react';
import Button from 'components/FormElements/Button';
import classnames from 'classnames';
import styles from './Login.module.scss';
import FacebookLogin, { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import { useDispatch } from 'react-redux';
import { getUserSuccess } from 'redux/ducks/user/actions';

const FacebookButton: React.FC = () => {
  const dispatch = useDispatch();

  const infoToUser = (userInfo: ReactFacebookLoginInfo | ReactFacebookFailureResponse): ReactFacebookLoginInfo => userInfo as ReactFacebookLoginInfo;

  const responseFacebook = (userInfo: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    const user: ReactFacebookLoginInfo = infoToUser(userInfo);
    if(user.id) {
      dispatch(getUserSuccess({
        id: +user.id,
        email: user.email || '',
        username: 'username',
        accessToken: user.accessToken,
      }));
    }
  }

  const clickFacebookButton = () => {
    const button: HTMLButtonElement | null = document.querySelector('.metro');
    if(button) {
      button.click();
    }
  }

  return (
    <>
      <FacebookLogin
        appId="312008073181165"
        fields="email"
        callback={responseFacebook}
        cssClass={styles.stupidButton}
      />
      <Button
        icon={['fab', 'facebook-square']}
        className={classnames(styles.button, styles.facebook)}
        type='submit'
        onClick={clickFacebookButton}
      >
        Login with facebook
      </Button>
    </>
  )
}

export default FacebookButton;
