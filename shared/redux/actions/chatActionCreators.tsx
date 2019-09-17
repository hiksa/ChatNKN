import {PURGE, REHYDRATE} from 'redux-persist';
import * as nknWallet from 'nkn-wallet';
import {ACTION_TYPES} from '../constants/actionTypes';
import MESSAGE_TYPES from '../constants/messageTypes';
import {
  showLoginScreen,
  showRegisterScreen,
  tabbedNavigation,
} from '../../../src/navigators/navigation';
import {useDispatch} from 'react-redux';

declare var window: any;

export const sendMessage = (payload: any) => {
  return (dispatch: Function, getState: Function) => {
    const client = window.nknClient;
    const {chatId, message} = payload;
    const action = {
      type: ACTION_TYPES.CHAT.ADD_MESSAGE,
      payload,
    };

    client
      .send(chatId, MESSAGE_TYPES.CHAT.MESSAGE + message.text)
      .then(function(x: any) {
        alert(x);
        console.log('chat message response', x);
        dispatch(action);
      })
      .catch((e: any) => {
        alert(e);
        console.log('chat message error', e);
        dispatch(action);
      });
  };
};

export const receiveMessage = (payload: any) => {
  return (dispatch: Function, getState: Function) => {
    const {userId} = getState().auth.currentUser;
    const chatId = payload.user._id;
    const isFriend = getState().contacts.contacts[userId].some(
      x => x.userId == payload.user._id,
    );

    dispatch({
      type: ACTION_TYPES.CHAT.ADD_MESSAGE,
      payload: {
        userId,
        chatId,
        isFriend,
        message: payload,
      },
    });
  };
};
