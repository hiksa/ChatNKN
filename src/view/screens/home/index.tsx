import {connect} from 'react-redux';
import Component from './Component';
import {purgeStorage} from '../../../../shared/redux/actions/actionCreators';
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
    contacts: result,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    purge: () => dispatch(purgeStorage()),
    // openChat: (chatId: string) => dispatch(startChat(chatId))
    openChat: (chatId: string) => console.log('starting chat'),
  };
};

const homeContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

export default homeContainer;
