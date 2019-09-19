import {connect} from 'react-redux';
import Component from './Component';
import {addContactAttempt} from '../../../../shared/redux/actions/contactsActionCreators';
import {UserPayload} from '../../../../shared/models/payloads';

const mapStateToProps = (state: any) => {
  const userId = state.auth.currentUser.userId;
  const existingContacts = state.contacts.contacts[userId].map(
    (x: UserPayload) => x.userId,
  );

  return {
    userId,
    existingContacts,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    addContact: (userId: string, payload: any) => {
      dispatch(addContactAttempt({userId, contact: payload}));
    },
  };
};

const addContactContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

export default addContactContainer;
