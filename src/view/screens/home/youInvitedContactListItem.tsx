import * as React from 'react';
import {View} from 'react-native';
import {Avatar, Text, ListItem, Button} from 'react-native-ui-kitten';

export interface Props {
  username: string;
  userId: string;

  deliveredOn: string;
  cancelInvitation: Function;
}

interface State {
  name: string;
}

export default class YouInvitedContactListItem extends React.Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
  }

  handleCancelInvitationClick = () => {
    this.props.cancelInvitation(this.props.userId);
  };

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
    const {username, deliveredOn} = this.props;
    const timeAgo = this.timeDifference(new Date(deliveredOn).getTime());
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
              <Text style={{fontSize: 14}}>
                was invited to become your contact
              </Text>
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
            <Button onPress={this.handleCancelInvitationClick} size="small">
              Cancel invitation
            </Button>
          </View>
        </View>
      </ListItem>
    );
  }
}
