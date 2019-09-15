import {connect} from 'react-redux';
import Component from './Component';
import {addContactAttempt} from '../../../../shared/redux/actions/contactsActionCreators';

const mapStateToProps = (state: any) => {
  const userId = state.auth.currentUser.userId;
  const existingContacts = state.contacts.contacts[userId].map(
    (x: any) => x.userId,
  );

  return {
    userId,
    existingContacts,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addContact: (userId: string, payload: any) => {
      let newPayload = {
        userId,
        contact: payload,
      };

      dispatch(addContactAttempt(newPayload));
    },
  };
};

const addContactContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

export default addContactContainer;
