import {
  combineReducers,
  createStore,
  CombinedState,
  applyMiddleware,
} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import { loadState, saveState } from 'utils/localStorage';
import { CardOptionsState, cardOptionsReducer } from './ducks/cardOptions/reducer';
import { CardCreatorState, cardCreatorReducer } from './ducks/cardCreator/reducer';
import { UserState, userReducer, UserActions } from './ducks/user/reducer';
import { cardReducer, CardState } from './ducks/card/reducer';

export type RootActions = UserActions;

export interface RootState {
  cardOptions: CardOptionsState;
  cardCreator: CardCreatorState;
  user: UserState,
  card: CardState,
}

const rootReducer = combineReducers<RootState>({
  cardOptions: cardOptionsReducer,
  cardCreator: cardCreatorReducer,
  user: userReducer,
  card: cardReducer,
});

const composeEnhancers = composeWithDevTools({
  trace: true,
  actionCreators: {},
});

const sagaMiddleware = createSagaMiddleware();

const initialState = loadState();

export const store = createStore<
  CombinedState<RootState>,
  RootActions,
  unknown,
  null
>(rootReducer, initialState, composeEnhancers(applyMiddleware(sagaMiddleware)));

store.subscribe(() => {
  saveState(store.getState());
});

sagaMiddleware.run(rootSaga);
