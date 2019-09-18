import * as React from 'react';
import {ScrollView, FlatList, Image, View} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from '../../../../shared/redux/store';
import {List, ListItem, Button, Text, Layout} from 'react-native-ui-kitten';

import styles from './styles';
import {SCREENS} from '../../../constants/screen';
import {Navigation} from 'react-native-navigation';
import ContactListItem from './contactListItem';

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
}

class Home extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
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
    return (
      <ScrollView style={styles.container}>
        <Layout>
          <Button
            status={'primary'}
            appearance={'outline'}
            style={{
              marginTop: 20,
              marginRight: 60,
              marginBottom: 20,
              marginLeft: 60,
              textAlign: 'center',
            }}
            onPress={this.openAddContactModal}>
            + Add Contact
          </Button>

          <FlatList
            style={{marginTop: 20, marginRight: 20, marginLeft: 20}}
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
        </Layout>
      </ScrollView>
    );
  }
}

export default Home;
