import React from 'react';
import Button from 'components/FormElements/Button';
import classnames from 'classnames';
import styles from './Login.module.scss';
import FacebookLogin, { ReactFacebookLoginInfo, ReactFacebookFailureResponse } from 'react-facebook-login';
import { useDispatch } from 'react-redux';
import { login } from 'redux/ducks/user/actions';

const FacebookButton: React.FC = () => {
  const dispatch = useDispatch();

  const infoToUser = (userInfo: ReactFacebookLoginInfo | ReactFacebookFailureResponse): ReactFacebookLoginInfo => userInfo as ReactFacebookLoginInfo;

  const responseFacebook = (userInfo: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
    const user: ReactFacebookLoginInfo = infoToUser(userInfo);
    console.log(userInfo);
    if(user.accessToken) {
      callLogin(user.accessToken);
    }
  }

  const clickFacebookButton = () => {
    const button: HTMLButtonElement | null = document.querySelector('.metro');
    if(button) {
      button.click();
    }
  }

  const callLogin = (token: string) => {
    const clientId: string | undefined = process.env.REACT_APP_CLIENT_ID;
    const clientSecret: string | undefined = process.env.REACT_APP_CLIENT_SECRET;
    if(clientId && clientSecret) {
      const formData = new FormData();
      formData.append('grant_type', 'convert_token');
      formData.append('client_id', clientId);
      formData.append('client_secret', clientSecret);
      formData.append('backend', 'facebook');
      formData.append('token', token);
      dispatch(login(formData));
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
        type='button'
        onClick={clickFacebookButton}
      >
        Login with facebook
      </Button>
    </>
  )
}

export default FacebookButton;
