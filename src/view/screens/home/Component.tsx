import * as React from 'react';
import {ScrollView, FlatList, Image, View, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from '../../../../shared/redux/store';
import {
  List,
  ListItem,
  Button,
  Text,
  Layout,
  TabView,
  Tab,
} from 'react-native-ui-kitten';
import ActionButton from 'react-native-action-button';

import {SCREENS} from '../../../constants/screen';
import {Navigation} from 'react-native-navigation';
import ContactListItem from './contactListItem';
import {TYPOGRAPHY} from '../../styles/typography';

declare var window: any;

export interface Props {
  componentId: string;
  name: string;
  addContact: Function;
  purge: Function;
  contacts: [];
}

interface State {
  name: string;
  selectedIndex: number;
}

class Home extends React.PureComponent<Props, State> {
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

  render() {
    const {contacts} = this.props;
    const pending = this.props.contacts.filter((x: any) => x.isPending);
    return (
      <ScrollView
        contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}
        style={[styles.container]}>
        <TabView
          selectedIndex={this.state.selectedIndex}
          onSelect={(index: number) => this.setState({selectedIndex: index})}>
          <Tab title={`Contacts (${this.props.contacts.length})`}>
            <FlatList
              style={styles.list}
              data={contacts}
              keyExtractor={(item: any) => item.userId}
              renderItem={({item}) => (
                <ContactListItem
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
              renderItem={({item}) => (
                <ContactListItem
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
        </TabView>
        <ActionButton
          buttonColor="#3366FF"
          onPress={this.openAddContactModal}></ActionButton>
      </ScrollView>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: TYPOGRAPHY.COLOR.Default,
    padding: 20,
  },
  list: {
    marginTop: 20,
  },
});
