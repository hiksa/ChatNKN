import * as React from 'react';
import {ScrollView, FlatList, View, StyleSheet} from 'react-native';
import {TabView, Tab} from 'react-native-ui-kitten';
import ActionButton from 'react-native-action-button';

import {SCREENS} from '../../../constants/screen';
import {Navigation} from 'react-native-navigation';
import ContactListItem from './contactListItem';
import PendingContactListItem from './pendingContactListItem';
import {TYPOGRAPHY} from '../../styles/typography';
import YouInvitedContactListItem from './youInvitedContactListItem';
// import {NotificationsAndroid} from 'react-native-notifications';

export interface Props {
  componentId: string;
  userId: string;
  contacts: [];

  addContact: Function;
  acceptInvite: Function;
  denyInvite: Function;
  cancelInvitation: Function;
}

interface State {
  name: string;
  selectedIndex: number;
}

export default class Home extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: '',
      selectedIndex: 0,
    };
  }

  componentDidMount() {
    //  this.props.purge();
  }

  openChat = (id: string, username: string) => {
    Navigation.push(this.props.componentId, {
      component: {
        name: SCREENS.Tabs.Chat,
        passProps: {
          chatId: id,
        },
        options: {
          topBar: {
            visible: true,
            drawBehind: false,
            title: {
              text: username,
            },
          },
          bottomTabs: {
            visible: false,
            drawBehind: true,
            animate: false,
          },
        },
      },
    });
  };

  openAddContactModal = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: SCREENS.Contacts.Add,
        options: {
          topBar: {
            visible: true,
            drawBehind: false,
            title: {
              text: 'Add Contact',
            },
          },
        },
      },
    });
  };

  acceptInvite = (userId: string) => {
    this.props.acceptInvite({
      userId: this.props.userId,
      contactId: userId,
      acceptedOn: new Date(),
    });
  };

  denyInvite = (userId: string) => {
    this.props.denyInvite({
      userId: this.props.userId,
      contactId: userId,
    });
  };

  cancelInvitation = (userId: string) => {
    this.props.cancelInvitation({
      userId: this.props.userId,
      contactId: userId,
    });
  };

  render() {
    const contacts = this.props.contacts.filter((x: any) => !x.isPending);
    const pending = this.props.contacts.filter((x: any) => x.isPending);
    return (
      <View
        style={StyleSheet.absoluteFill}
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>
        <ScrollView style={[styles.container]}>
          <TabView
            selectedIndex={this.state.selectedIndex}
            onSelect={(index: number) => this.setState({selectedIndex: index})}>
            <Tab title={`Contacts (${contacts.length})`}>
              <FlatList
                style={styles.list}
                data={contacts}
                keyExtractor={(item: any) => item.userId}
                renderItem={({item}) => (
                  <ContactListItem
                    path={item.path}
                    imageData={item.avatarDataBase64}
                    handleClick={this.openChat}
                    username={item.username}
                    userId={item.userId}
                    lastMessageSent={item.lastMessageSent}
                    lastMessageText={item.lastMessageText}
                    hasUnreadMessages={item.hasUnreadMessages}
                  />
                )}
              />
            </Tab>
            <Tab title={`Pending (${pending.length})`}>
              <FlatList
                style={styles.list}
                data={pending}
                keyExtractor={(item: any) => item.userId}
                renderItem={({item}) =>
                  item.requestReceivedOn ? (
                    <PendingContactListItem
                      handleClick={this.openChat}
                      username={item.username}
                      userId={item.userId}
                      lastMessageSent={item.lastMessageSent}
                      lastMessageText={item.lastMessageText}
                      hasUnreadMessages={item.hasUnreadMessages}
                      acceptInvite={this.acceptInvite}
                      denyInvite={this.denyInvite}
                      requestReceivedOn={item.requestReceivedOn}
                    />
                  ) : (
                    <YouInvitedContactListItem
                      username={item.username}
                      userId={item.userId}
                      deliveredOn={item.deliveredOn}
                      cancelInvitation={this.cancelInvitation}
                    />
                  )
                }
              />
            </Tab>
          </TabView>
        </ScrollView>
        <ActionButton
          buttonColor="#3366FF"
          onPress={this.openAddContactModal}></ActionButton>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: TYPOGRAPHY.COLOR.Default,
    padding: 20,
  },
  list: {
    marginTop: 20,
    marginBottom: 30,
  },
});
