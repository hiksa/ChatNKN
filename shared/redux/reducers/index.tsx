/**
 * This file includes all the reducers under reducers directory,
 * Import all and add to combineReducers to use any among whole app
 *
 * ** */
import { combineReducers } from 'redux';

import app from './app';
import auth from './auth';
import contacts from './contacts';
import chat from './chat';
import wallet from './wallet';

export default combineReducers({
  app,
  auth,
  contacts,
  chat,
  wallet
});
