import * as React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';

export interface Props {
  userId: string;
  chatId: string;
  name: string;
  sendMessage: Function;
  seeMessage: Function;
  messages: [];
}

interface State {
  name: string;
  messages: any[];
}

class Chat extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  checkForUnreadMessages() {
    const lastUnreadMessage = this.props.messages
      .filter((x: any) => x.user._id != this.props.userId && !x.seen)
      .sort((x: any, y: any) => y.createdAt - x.createdAt)[0];

    if (lastUnreadMessage) {
      this.props.seeMessage({
        chatId: this.props.chatId,
        message: lastUnreadMessage,
        userId: this.props.userId,
      });
    }
  }

  componentDidMount() {
    this.onSend = this.onSend.bind(this);
  }

  onSend(messages: any = []) {
    let payload = {
      userId: this.props.userId,
      chatId: this.props.chatId,
      message: {
        ...messages[0],
        delivered: false,
        allowed: true,
        seen: false,
        createdAt: new Date(),
      },
    };

    this.props.sendMessage(payload);
  }

  render() {
    this.checkForUnreadMessages();
    return (
      <GiftedChat
        messages={this.props.messages}
        onSend={(x: any) => this.onSend(x)}
        user={{_id: this.props.userId}}
      />
    );
  }
}

export default Chat;
