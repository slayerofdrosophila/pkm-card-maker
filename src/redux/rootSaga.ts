import { all } from 'redux-saga/effects';
import cardSaga from './ducks/card/saga';
import cardOptionsSaga from './ducks/cardOptions/saga';
import userSaga from './ducks/user/saga';

export default function* rootSaga() {
  yield all([cardOptionsSaga(), userSaga(), cardSaga()]);
}
