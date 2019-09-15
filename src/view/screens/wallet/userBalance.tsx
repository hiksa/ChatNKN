import * as React from 'react';
// import {View, Text} from 'react-native';
import {Text, Layout} from 'react-native-ui-kitten';
import {CText} from '../../elements/custom';
import Clipboard from '@react-native-community/react-native-clipboard';

export interface Props {
  address: string;
  balance: number;
}

interface State {}

export default class UserBalance extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  copyAddress = () => {
    console.log(this.props.address);
    Clipboard.setString(this.props.address);
  };

  render() {
    return (
      <Layout level={'3'}>
        <Text
          category={'h6'}
          onPress={this.copyAddress}
          style={{
            paddingLeft: 10,
            paddingRight: 10,
            textAlign: 'center',
            marginTop: 20,
          }}>
          {this.props.address}
        </Text>
        <Text style={{fontSize: 12, fontStyle: 'italic', textAlign: 'center'}}>
          tap to copy
        </Text>
        <Text
          category={'h4'}
          style={{
            textAlign: 'center',
            marginTop: 30,
            marginBottom: 10,
            fontWeight: 'bold',
          }}>
          {`Balance ${this.props.balance.toFixed(8)} NKN`}
        </Text>
      </Layout>
    );
  }
}
