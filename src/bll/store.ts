import {
  Action, applyMiddleware, combineReducers, legacy_createStore as createStore,
} from 'redux';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { useDispatch } from 'react-redux';
import { listReducer } from './reducers/list-reducers';
import { preloadedState } from '../uitls/local-sotrage';

export const rootReducer = combineReducers({
  list: listReducer,
});

// types
export type AppRootType = ReturnType<typeof rootReducer>;
export type AppThunkType = ThunkDispatch<AppRootType, unknown, Action>

// applyMiddleware supercharges createStore with middleware:
export const store = createStore(rootReducer, preloadedState, applyMiddleware(thunk));
export const useAppDispatch = () => useDispatch<AppThunkType>();

// @ts-ignore
window.store = store;
