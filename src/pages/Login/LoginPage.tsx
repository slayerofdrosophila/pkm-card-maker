import React from 'react';
import styles from './Login.module.scss';
import computerSvg from './computer.svg';
import { useForm } from 'react-hook-form';
import { Input } from 'components/FormElements';
import Error from 'components/FormElements/Error';
import Button from 'components/FormElements/Button';
import FacebookButton from './Facebook';
import Motion from 'pages/Motion';

interface LoginForm {
  email: string,
  password: string,
}

const LoginPage: React.FC = () => {
  const { register, errors, handleSubmit } = useForm<LoginForm>();

  const handleLogin = (data: LoginForm) => {
    console.log(data);
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
          <Error error={errors.email} />
          <Input
            horizontal
            type='text'
            name='Password'
            shortName='password'
            ref={register({ required: true })}
          />
          <Error error={errors.password} />
          <Button className={styles.button} type='submit'>Login</Button>
          <FacebookButton />
        </div>
      </form>
    </div>
  )
}

export default LoginPage;
