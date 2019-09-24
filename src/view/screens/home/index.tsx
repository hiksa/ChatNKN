import {connect} from 'react-redux';
import Component from './Component';
import {
  acceptInvite,
  denyInvite,
  cancelInvitation,
} from '../../../shared/redux/actions/contactsActionCreators';
// import { startChat } from '../../../../shared/redux/actions/chatActionCreators';

const mapStateToProps = (state: any) => {
  const {userId} = state.auth.currentUser;
  const contacts = state.contacts.contacts[userId];

  const result = contacts.map((x: any) => {
    const messages = state.chat.chats[userId][x.userId];
    const hasUnread = messages.some((y: any) => !y.received);
    return {
      ...x,
      hasUnread,
    };
  });

  return {
    userId,
    contacts: result,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    acceptInvite: (payload: any) => dispatch(acceptInvite(payload)),
    denyInvite: (payload: any) => dispatch(denyInvite(payload)),
    cancelInvitation: (payload: any) => dispatch(cancelInvitation(payload)),
  };
};

const homeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

export default homeContainer;
