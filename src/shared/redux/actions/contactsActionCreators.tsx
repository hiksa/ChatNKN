import {ACTION_TYPES} from '../constants/actionTypes';
import {Navigation} from 'react-native-navigation';
import {tabbedNavigation} from '../../../navigators/navigation';
import {MESSAGE_TYPES} from '../constants/messageTypes';
import store from '../store';
import NknService from '../../misc/nkn';

var msgpack = require('msgpack-lite');
var fs = require('react-native-fs');

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

    const client = NknService.client;
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
    const avatarSource = getState().auth.currentUser.avatarSource;
    const avatarUri = avatarSource.uri;

    fs.readFile(avatarUri, 'base64').then((data: string) => {
      const encodedMessage = msgpack.encode({
        type: MESSAGE_TYPES.CONTACT.ACCEPT,
        avatarData: data,
      });

      NknService.client
        .send(payload.contactId, encodedMessage)
        .then(x => console.log(x))
        .catch(e => console.log(e));

      dispatch({
        type: ACTION_TYPES.CONTACTS.ACCEPT_INVITATION,
        payload,
      });
    });
  };
};

export const denyInvite = (payload: any) => {
  return {
    type: ACTION_TYPES.CONTACTS.DENY_INVITATION,
    payload,
  };
};

export const cancelInvitation = (payload: any) => {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: ACTION_TYPES.CONTACTS.CANCEL_INVITATION,
      payload,
    });
  };
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
    payload,
  };
};

export const updateContactImage = (payload: any) => {
  return {
    type: ACTION_TYPES.CONTACTS.UPDATE_IMAGE,
    payload,
  };
};
