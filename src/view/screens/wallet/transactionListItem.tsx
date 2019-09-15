import * as React from 'react';
import {View, Text} from 'react-native';
import {CText} from '../../elements/custom';
import {ListItem, Avatar} from 'react-native-ui-kitten';

export interface Props {
  txId: string;
  date: Date;
  from: string;
  to: string;
  amount: number;
  isClaimTx: boolean;
  success: boolean;
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

    const icon = this.props.isClaimTx
      ? 'claim'
      : this.props.isOutgoing
      ? 'sending'
      : 'receiving';

    return (
      <ListItem
        icon={() => (
          <Avatar source={require('../../assets/images/avatar.png')} />
        )}
        onPress={this.handleItemPressed}
        title={this.props.txId.substr(0, 30) + '...'}
        description={`${formattedDate} - ${amountPrefix} ${formattedAmount} NKN ${addressPrefix} ${destinationAddress}`}
      />
    );
  }
}
