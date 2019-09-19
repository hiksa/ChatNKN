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
  hasUnreadMessages: boolean;
}

interface State {
  name: string;
}

export default class PendingContactListItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  handleOnClick = () => {
    console.log(this.props);
    this.props.handleClick(this.props.userId, this.props.username);
  };

  componentDidMount() {
    // console.log(this.props.userId);
  }

  timeDifference(previous: number) {
    let current = new Date().getTime();
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = current - previous;

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds ago';
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes ago';
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours ago';
    } else if (elapsed < msPerMonth) {
      return '~ ' + Math.round(elapsed / msPerDay) + ' days ago';
    } else if (elapsed < msPerYear) {
      return '~ ' + Math.round(elapsed / msPerMonth) + ' months ago';
    } else {
      return '~ ' + Math.round(elapsed / msPerYear) + ' years ago';
    }
  }

  getDescription(lastMessageSent: string, lastMessageText: string): string {
    let timePart = lastMessageSent
      ? this.timeDifference(new Date(lastMessageSent).getTime())
      : 'no messages';

    return `${timePart} - ${lastMessageText}`;
  }

  render() {
    const {username, lastMessageSent, lastMessageText} = this.props;
    const description = this.getDescription(lastMessageSent, lastMessageText);

    return (
      <ListItem
        onPress={this.handleOnClick}
        title={username}
        description={description}
        icon={() => (
          <Avatar source={require('../../assets/images/avatar.png')} />
        )}
      />
    );
  }
}
