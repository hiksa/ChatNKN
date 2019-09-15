import { createStore, applyMiddleware, Middleware } from 'redux';
import AsyncStorage from '@react-native-community/async-storage';
import * as thunkMiddleware from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let middlewares = new Array<Middleware>(thunkMiddleware.default);
if (true) {
  const loggerMiddleware = createLogger();
  middlewares = [...middlewares, loggerMiddleware];
}

const store = createStore(
  persistedReducer, 
  applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default store;