import {PURGE, REHYDRATE} from 'redux-persist';
import {ACTION_TYPES} from '../constants/actionTypes';
import MESSAGE_TYPES from '../constants/messageTypes';
import {
  showLoginScreen,
  showRegisterScreen,
  tabbedNavigation,
} from '../../../navigators/navigation';
import {useDispatch} from 'react-redux';
import NknService from '../../misc/nkn';

var msgpack = require('msgpack-lite');

export const markSeen = (payload: any) => {
  return {
    type: ACTION_TYPES.CHAT.MARK_SEEN,
    payload,
  };
};

export const markReceived = (payload: any) => {
  return {
    type: ACTION_TYPES.CHAT.MARK_RECEIVED,
    payload: {
      chatId: payload.chatId,
      messageId: payload._id,
      userId: payload.userId,
    },
  };
};

export const seeMessage = (payload: any) => {
  return (dispatch: Function, getState: Function) => {
    const client = NknService.client;
    const {chatId, message, userId} = payload;

    const encoded = msgpack.encode({
      _id: message._id,
      type: MESSAGE_TYPES.CHAT.MESSAGE_SEEN,
    });

    client
      .send(chatId, encoded)
      .then(function(x: any) {
        // dispatch({
        //   type: ACTION_TYPES.CHAT.MESSAGE_DELIVERED,
        //   payload,
        // });
      })
      .catch((e: any) => alert(e));

    const seenPayload = {chatId: chatId, userId: userId};
    dispatch(markSeen(seenPayload));
  };
};

export const sendMessage = (payload: any) => {
  return (dispatch: Function, getState: Function) => {
    const client = NknService.client;
    const {chatId, message} = payload;

    const encodedMessage = msgpack.encode({
      text: message.text,
      _id: message._id,
      type: MESSAGE_TYPES.CHAT.MESSAGE,
    });

    client
      .send(chatId, encodedMessage)
      .then(function(x: any) {
        dispatch({
          type: ACTION_TYPES.CHAT.MESSAGE_DELIVERED,
          payload,
        });
      })
      .catch((e: any) => alert(e));

    const action = {
      type: ACTION_TYPES.CHAT.ADD_MESSAGE,
      payload,
    };

    dispatch(action);
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
