import { all } from 'redux-saga/effects';
import cardOptionsSaga from './ducks/cardOptions/saga';
import userSaga from './ducks/user/saga';

export default function* rootSaga() {
  yield all([cardOptionsSaga(), userSaga()]);
}
