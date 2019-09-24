/**
 * This file includes all the reducers under reducers directory,
 * Import all and add to combineReducers to use any among whole app
 *
 * ** */
import {combineReducers} from 'redux';

import * as app from './app';
import * as auth from './auth';
import * as contacts from './contacts';
import * as chat from './chat';
import * as wallet from './wallet';

export interface AppState {
  app: app.State;
  auth: auth.State;
  contacts: contacts.State;
  chat: chat.State;
  wallet: wallet.State;
}

export default combineReducers<AppState>({
  app: app.default,
  auth: auth.default,
  contacts: contacts.default,
  chat: chat.default,
  wallet: wallet.default,
});
