import React, { useRef } from 'react';
import Button from 'components/FormElements/Button';
import classnames from 'classnames';
import styles from './Login.module.scss';
import FacebookLogin from 'react-facebook-login';

const FacebookButton: React.FC = () => {
  const responseFacebook = (userInfo: any) => {
    console.log(userInfo);
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
        fields="name,email,picture"
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
