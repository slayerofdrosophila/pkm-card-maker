import React from 'react';
import styles from './Login.module.scss';
import computerSvg from './computer.svg';
import { useForm } from 'react-hook-form';
import { Input } from 'components/FormElements';
import Error from 'components/FormElements/Error';
import Button from 'components/FormElements/Button';
import FacebookButton from './Facebook';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'redux/ducks/user/actions';
import { selectUserError, selectUserLoading } from 'redux/ducks/user/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

interface LoginForm {
  username: string,
  password: string,
}

const LoginPage: React.FC = () => {
  const { register, errors, handleSubmit } = useForm<LoginForm>();
  const isLoading = useSelector(selectUserLoading);
  const error = useSelector(selectUserError);
  const dispatch = useDispatch();

  const handleLogin = ({ username, password }: LoginForm) => {
    const clientId: string | undefined = process.env.REACT_APP_CLIENT_ID;
    const clientSecret: string | undefined = process.env.REACT_APP_CLIENT_SECRET;
    if(clientId && clientSecret) {
      const formData = new FormData();
      formData.append('client_id', clientId);
      formData.append('client_secret', clientSecret);
      formData.append('grant_type', 'password');
      formData.append('username', username);
      formData.append('password', password);
      dispatch(login({
        endpoint: "/o/token/",
        data: formData,
      }));
    }
  }

  return (
    <div className={styles.wrapper}>
      <img className={styles.computer} src={computerSvg} alt='' />
      <form onSubmit={handleSubmit(handleLogin)} className={styles.form}>
        <h1 className={styles.title}>Card Creator</h1>
        <div className={styles.inputs}>
          <Input
            horizontal
            type='text'
            name='Username'
            shortName='username'
            ref={register({ required: true })}
          />
          <Error error={errors.username} />
          <Input
            horizontal
            type='password'
            name='Password'
            shortName='password'
            ref={register({ required: true })}
          />
          <Error error={errors.password} />
          {error?.code &&
            <p>Something went wrong: {error.code}</p>
          }
          <Button className={styles.button} type='submit'>
            {isLoading ?
              <FontAwesomeIcon spin icon={faSpinner} />
              :
              'Login'
            }
          </Button>
          <FacebookButton />
        </div>
      </form>
    </div>
  )
}

export default LoginPage;
