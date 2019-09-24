import * as React from 'react';
import {SafeAreaView, ScrollView, StyleSheet} from 'react-native';
import {List, Button, Text, Layout} from 'react-native-ui-kitten';
import UserBalance from './userBalance';
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

export default class Wallet extends React.PureComponent<any, State> {
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
    const {balance, address, transactions} = this.props;
    return (
      <SafeAreaView style={{flex: 1}}>
        <Layout style={[styles.container, StyleSheet.absoluteFill]}>
          <UserBalance balance={balance} address={address} />
          <Layout level={'3'} style={styles.buttonsContainer}>
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
          <Text appearance="default" category="h4" style={styles.txHeader}>
            Last Transactions
          </Text>
          <ScrollView>
            <List
              data={transactions}
              renderItem={({item}) => <TransactionListItem {...item} />}
            />
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
  txHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    paddingBottom: 20,
  },
});
