import * as React from 'react';
import {View} from 'react-native';
import {Avatar, Text, ListItem, Button} from 'react-native-ui-kitten';

export interface Props {
  username: string;
  userId: string;
  //  imageUrl: string;
  handleClick: Function;
  lastMessageText: string;
  lastMessageSent: string;
  requestReceivedOn: string;
  hasUnreadMessages: boolean;

  acceptInvite: Function;
  denyInvite: Function;
}

interface State {
  name: string;
}

export default class PendingContactListItem extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
  }

  handleAcceptInviteClick = () => {
    this.props.acceptInvite(this.props.userId);
  };

  handleDenyInviteClick = () => {
    this.props.denyInvite(this.props.userId);
  };

  handleCancelInvitationClick = () => {};

  componentDidMount() {}

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

  render() {
    const {username, requestReceivedOn} = this.props;
    const timeAgo = this.timeDifference(new Date(requestReceivedOn).getTime());
    return (
      <ListItem style={{flex: 1}}>
        <Avatar
          style={{flex: 1}}
          source={require('../../assets/images/avatar.png')}
        />
        <View style={{flex: 7, marginLeft: 20}}>
          <View>
            <Text>
              <Text style={{fontWeight: 'bold'}}>{username}</Text>{' '}
              <Text style={{fontSize: 14}}>wants to add you as a contact</Text>
            </Text>
            <Text style={{fontSize: 12, fontStyle: 'italic'}}>
              invitation received{' '}
              <Text
                style={{fontSize: 12, fontStyle: 'italic', fontWeight: 'bold'}}>
                {timeAgo}
              </Text>
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingTop: 10,
            }}>
            <Button onPress={this.handleAcceptInviteClick} size="small">
              Accept
            </Button>
            <Button
              onPress={this.handleDenyInviteClick}
              size="small"
              appearance="outline">
              Deny
            </Button>
          </View>
        </View>
      </ListItem>
    );
  }
}
