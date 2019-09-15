import * as React from 'react';
import {ScrollView, FlatList, Image} from 'react-native';
import {Avatar, Text, ListItem} from 'react-native-ui-kitten';

export interface Props {
  username: string;
  userId: string;
  //  imageUrl: string;
  handleClick: Function;
  lastMessageText: string;
  lastMessageSent: string;
}

interface State {
  name: string;
}

export default class ContactListItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  handleOnClick = () => {
    console.log(this.props);
    this.props.handleClick(this.props.userId);
  };

  componentDidMount() {
    // console.log(this.props.userId);
  }

  render() {
    return (
      <ListItem
        onPress={this.handleOnClick}
        title={this.props.username.substr(0, 30) + '...'}
        description={`${this.props.lastMessageSent} - ${this.props.lastMessageText}`}
        icon={() => (
          <Avatar source={require('../../assets/images/avatar.png')} />
        )}
      />
    );
  }
}
