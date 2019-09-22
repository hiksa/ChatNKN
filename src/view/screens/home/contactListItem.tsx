import * as React from 'react';
import {ScrollView, FlatList, Image, View} from 'react-native';
import {Avatar, Text, ListItem} from 'react-native-ui-kitten';
import TimeAgo from 'react-native-timeago';

export interface Props {
  username: string;
  userId: string;
  imageData: string;
  //  imageUrl: string;
  handleClick: Function;
  lastMessageText: string;
  lastMessageSent: string;
  hasUnreadMessages: boolean;
  path: string;
}

interface State {
  name: string;
}

export default class ContactListItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  handleOnClick = () => {
    this.props.handleClick(this.props.userId, this.props.username);
  };

  componentDidMount() {
    // console.log(this.props.userId);
  }

  render() {
    const {username, lastMessageSent, lastMessageText} = this.props;
    const messageText =
      lastMessageText.substr(0, 30) +
      (lastMessageText.length > 30 ? '...' : '');
    return (
      <ListItem onPress={this.handleOnClick}>
        <Avatar source={{uri: 'file://' + this.props.path}} />
        <View style={{flex: 7, marginLeft: 20}}>
          <Text style={{fontWeight: 'bold'}}>{username}</Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TimeAgo
              time={lastMessageSent}
              style={{fontSize: 12, fontWeight: 'bold', fontStyle: 'italic'}}
            />
            <Text style={{fontSize: 12, marginLeft: 10}}>{messageText}</Text>
          </View>
        </View>
      </ListItem>
    );
  }
}
