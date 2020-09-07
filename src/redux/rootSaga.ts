import { all } from 'redux-saga/effects';
import cardOptionsSaga from './ducks/cardOptions/saga';

export default function* rootSaga() {
  yield all([cardOptionsSaga()]);
}
