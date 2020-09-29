import Motion from 'pages/Motion';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from 'redux/ducks/user/actions';
import { selectUser } from 'redux/ducks/user/selectors';
// import styles from './Profile.module.scss';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch])

  return (
    <Motion>
      <img src={user.photo} alt='' />
      <p><b>Email: </b>{user.email}</p>
      <p><b>First name: </b>{user.firstName}</p>
      <p><b>Username: </b>{user.username}</p>
      <b>Bio: </b>
      <p>{user.bio}</p>
    </Motion>
  )
}

export default ProfilePage;
