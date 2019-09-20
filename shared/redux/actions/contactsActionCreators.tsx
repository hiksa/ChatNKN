import {ACTION_TYPES} from '../constants/actionTypes';
import {Navigation} from 'react-native-navigation';
import {tabbedNavigation} from '../../../src/navigators/navigation';
import {MESSAGE_TYPES} from '../constants/messageTypes';
import store from '../store';

var msgpack = require('msgpack-lite');

declare var window: any;

export const addContactAttempt = (payload: any) => {
  return (dispatch: Function, getState: Function) => {
    const {userId} = payload;
    const contactId = payload.contact.userId;
    const contactExists =
      getState().contacts.contacts[userId].filter(
        (x: any) => x.userId == contactId,
      ).length != 0;

    if (contactExists) {
      // TODO: notify about existing contact
      console.error('contact exists');
      return;
    }

    const isSelf = userId == contactId;
    if (isSelf) {
      console.error('cannot add urself as a friend');
      return;
    }

    const client = window.nknClient;
    const {username} = store.getState().auth.currentUser;

    const encodedMessage = msgpack.encode({
      type: MESSAGE_TYPES.CONTACT.ADD,
      username,
    });

    client
      .send(contactId, encodedMessage)
      .then((x: any) => {
        const deliveredAction = {
          type: ACTION_TYPES.CONTACTS.ADD_CONTACT_ATTEMPT_DELIVERED,
          payload: {
            userId,
            contactId,
            deliveredOn: new Date(),
          },
        };

        dispatch(deliveredAction);
      })
      .catch((e: any) => {
        alert('Catch: ' + e);
      });

    payload.invitationReceived = false;
    payload.isDelivered = false;
    payload.lastInviteSentOn = new Date();

    const attemptAction = {
      type: ACTION_TYPES.CONTACTS.ADD_CONTACT_ATTEMPT,
      payload,
    };

    dispatch(attemptAction);

    tabbedNavigation();
  };
};

export const addContactSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.CONTACTS.ADD_CONTACT_SUCCESS,
    payload: payload,
  };
};

export const acceptInvite = (payload: any) => {
  return (dispatch: Function, getState: Function) => {
    const encodedMessage = msgpack.encode({
      type: MESSAGE_TYPES.CONTACT.ACCEPT,
    });

    window.nknClient
      .send(payload.contactId, encodedMessage)
      .then(x => console.log(x))
      .catch(e => console.log(e));

    dispatch({
      type: ACTION_TYPES.CONTACTS.ACCEPT_INVITATION,
      payload,
    });
  };
};

export const denyInvite = (payload: any) => {
  return (dispatch: Function, getState: Function) => {};
};

export const cancelInvitation = (payload: any) => {
  return (dispatch: Function, getState: Function) => {};
};

export const addContactInvitationReceived = (payload: any) => {
  return {
    type: ACTION_TYPES.CONTACTS.INVITATION_RECEIVED,
    payload,
  };
};

export const removeContact = (payload: any) => {
  return {
    type: ACTION_TYPES.CONTACTS.REMOVE_CONTACT,
    payload: payload,
  };
};
