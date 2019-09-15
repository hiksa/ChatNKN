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

      return;
    }

    payload.isConfirmed = false;
    payload.invitationReceived = false;

    const action = {
      type: ACTION_TYPES.CONTACTS.ADD_CONTACT_ATTEMPT,
      payload,
    };

    window.nknClient
      .send(contact.userId, 'ADD_REQUEST')
      .then((x: any) => {
        console.log('ADD_REQUEST response: ', x);

        action.payload.invitationReceived = true;
        dispatch(action);
      })
      .catch((e: any) => {
        console.log('Catch: ', e);

        dispatch(action);
      });

    tabbedNavigation();
  };
};

export const removeContact = (payload: any) => {
  return {
    type: ACTION_TYPES.CONTACTS.REMOVE_CONTACT,
    payload: payload,
  };
};
