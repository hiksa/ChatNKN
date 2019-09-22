import * as React from 'react';
import {View, Text} from 'react-native';
import {ListItem, Avatar} from 'react-native-ui-kitten';
import TimeAgo from 'react-native-timeago';

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

export default class TransactionListItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  handleTransactionClick = () => {};

  handleItemPressed = () => {};

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
