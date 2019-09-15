import * as React from 'react';
import {
  View,
  Image,
  SafeAreaView,
  FlatList,
  ScrollView,
  StyleSheet,
} from 'react-native';

import {List, ListItem, Button, Text, Layout} from 'react-native-ui-kitten';

import {showLoginScreen} from '../../../navigators/navigation';
import {BUTTON_DEFAULT} from '../../elements/buttons';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from '../../../../shared/redux/store';
import {Provider} from 'react-redux';
import UserBalance from './userBalance';
import {CText} from '../../elements/custom';
import {SCREENS} from '../../../constants/screen';
import {Navigation} from 'react-native-navigation';
import TransactionListItem from './transactionListItem';

export interface Props {
  balance: number;
  address: string;
  username: string;
  transactions: any[];
}

interface State {}

class Wallet extends React.PureComponent<any, State> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {}

  handleSend = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: SCREENS.Wallet.Send,
        options: {
          topBar: {
            drawBehind: false,
            visible: true,
            title: {
              text: 'Send NKN',
            },
          },
        },
      },
    });
  };

  withdraw = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: SCREENS.Wallet.Receive,
        options: {
          topBar: {
            drawBehind: false,
            visible: true,
            title: {
              text: 'Receive NKN',
            },
          },
        },
      },
    });
  };

  render() {
    const {balance, address} = this.props;
    return (
      <SafeAreaView style={{flex: 1}}>
        <Layout style={[styles.container, StyleSheet.absoluteFill]}>
          <UserBalance balance={balance} address={address} />
          <Layout
            level={'3'}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingTop: 20,
              paddingBottom: 20,
            }}>
            <Button
              onPress={this.handleSend}
              style={{width: 120}}
              textStyle={{textAlign: 'center'}}>
              Send
            </Button>
            <Button
              onPress={this.withdraw}
              style={{width: 120}}
              textStyle={{textAlign: 'center'}}>
              Receive
            </Button>
          </Layout>

          <Text
            appearance="default"
            category="h4"
            style={{
              fontWeight: 'bold',
              fontSize: 18,
              textAlign: 'center',
              marginTop: 20,
            }}>
            {/* > */}
            Last Transactions
          </Text>

          <ScrollView>
            <List
              data={this.props.transactions}
              renderItem={({item}) => <TransactionListItem {...item} />}
            />

            {/* <FlatList
              data={this.props.transactions}
              keyExtractor={(item: any) => item.txId}
              renderItem={({item}) => <TransactionListItem {...item} />}
            /> */}
          </ScrollView>
        </Layout>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default Wallet;
