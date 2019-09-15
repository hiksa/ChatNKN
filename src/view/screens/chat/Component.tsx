import * as React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {ScrollView, Text, FlatList} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from '../../../../shared/redux/store';

import {CText} from '../../elements/custom';

export interface Props {
  userId: string;
  chatId: string;
  name: string;
  sendMessage: Function;
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

  componentDidMount() {
    this.onSend = this.onSend.bind(this);
  }

  onSend(messages: any = []) {
    // GiftedChat.append(this.state.messages, messages);

    let payload = {
      userId: this.props.userId,
      chatId: this.props.chatId,
      message: {
        ...messages[0],
        delivered: false,
        allowed: true,
        seen: false,
      },
    };

    console.log(payload);
    this.props.sendMessage(payload);
  }

  render() {
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