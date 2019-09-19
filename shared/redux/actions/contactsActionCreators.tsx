import {ACTION_TYPES} from '../constants/actionTypes';
import {Navigation} from 'react-native-navigation';
import {tabbedNavigation} from '../../../src/navigators/navigation';

declare var window: any;

export const addContactAttempt = (payload: any) => {
  return (dispatch: Function, getState: Function) => {
    const {userId, contact} = payload;
    const contactExists =
      getState().contacts.contacts[userId].filter(
        (x: any) => x.userId == contact.userId,
      ).length != 0;

    if (contactExists) {
      // TODO: notify about existing contact
      console.error('contact exists');
      return;
    }

    const isSelf = userId == contact.userId;
    if (isSelf) {
      console.error('cannot add urself as a friend');
      return;
    }

    payload.isConfirmed = false;
    payload.invitationReceived = false;

    console.log('adding contact');
    window.nknClient
      .send(contact.userId, 'ADD_REQUEST')
      .then((x: any) => {
        const deliveredAction = {
          type: ACTION_TYPES.CONTACTS.ADD_CONTACT_ATTEMPT_DELIVERED,
          payload: {
            userId: userId,
            contactId: contact.userId,
          },
        };

        dispatch(deliveredAction);
      })
      .catch((e: any) => {
        alert('Catch: ' + e);
      });

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
    payload: payload
  };
}

export const removeContact = (payload: any) => {
  return {
    type: ACTION_TYPES.CONTACTS.REMOVE_CONTACT,
    payload: payload,
  };
};
