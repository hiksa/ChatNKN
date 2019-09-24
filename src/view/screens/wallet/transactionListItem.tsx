import * as React from 'react';
import {View, Text, Linking} from 'react-native';
import {ListItem, Avatar} from 'react-native-ui-kitten';
import TimeAgo from 'react-native-timeago';
import Toast from 'react-native-root-toast';

export interface Props {
  txId: string;
  date: Date;
  from: string;
  to: string;
  amount: number;
  isClaimTx: boolean;
  success: boolean;
  confirmed: boolean;
  isOutgoing: boolean;
}

interface State {}

const transactionNotConfirmedMessage =
  'Transaction not confirmed yet. Please wait a few minutes and try again.';

export default class TransactionListItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  handleTransactionClick = () => {};

  handleItemPressed = () => {
    // if (!this.props.confirmed) {
    //   Toast.show(transactionNotConfirmedMessage, {
    //     duration: Toast.durations.SHORT,
    //     position: Toast.positions.TOP,
    //   });

    //   return;
    // }

    const url = `https://explorer.nknx.org/transactions/${this.props.txId}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  render() {
    const formattedDate = new Date(this.props.date).toLocaleDateString('en-US');
    const formattedAmount = this.props.amount.toFixed(8);
    const amountPrefix = this.props.isOutgoing ? 'sent' : 'received';
    const addressPrefix = this.props.isOutgoing ? 'to' : 'from';
    const destinationAddress = this.props.isOutgoing
      ? this.props.to
      : this.props.from;

    return (
      <ListItem
        onPress={this.handleItemPressed}
        description={`${formattedDate} - ${amountPrefix} ${formattedAmount} NKN ${addressPrefix} ${destinationAddress}`}>
        <Avatar
          source={
            this.props.isOutgoing
              ? require('../../assets/images/arrow-left.png')
              : require('../../assets/images/arrow-right.png')
          }
        />

        <View style={{flex: 7, marginLeft: 20}}>
          <Text style={{fontWeight: 'bold'}}>
            {this.props.txId.substr(0, 30) + '...'}
          </Text>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TimeAgo
              time={this.props.date}
              style={{
                fontSize: 12,
                fontWeight: 'bold',
                fontStyle: 'italic',
                marginRight: 5,
              }}
            />
            <Text style={{fontStyle: 'italic', fontSize: 12}}>
              {`${amountPrefix} ${formattedAmount} NKN ${addressPrefix}`}
            </Text>
          </View>
          <Text style={{fontSize: 12}}>{destinationAddress}</Text>
        </View>
      </ListItem>
    );
  }
}
