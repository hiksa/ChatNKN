import {connect} from 'react-redux';
import Component from './Component';
import {
  sendMessage,
  seeMessage,
} from '../../../../shared/redux/actions/chatActionCreators';

const mapStateToProps = (state: any, ownProps: any) => {
  const {userId} = state.auth.currentUser;
  const {chatId} = ownProps;
  const messages = state.chat.chats[userId][chatId].map(x => ({
    ...x,
    user: {...x.user, avatar: require('../../assets/images/avatar.png')},
  }));

  return {
    messages,
    userId,
    chatId,
    name: userId,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    sendMessage: (payload: any) => dispatch(sendMessage(payload)),
    seeMessage: (payload: any) => dispatch(seeMessage(payload)),
  };
};

const chatContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

export default chatContainer;
