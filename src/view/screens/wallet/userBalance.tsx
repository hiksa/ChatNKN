import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Text, Layout} from 'react-native-ui-kitten';
import Clipboard from '@react-native-community/react-native-clipboard';
import Toast from 'react-native-root-toast';

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
    Clipboard.setString(this.props.address);
    Toast.show('Address copied to clipboard.', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
    });
  };

  render() {
    return (
      <Layout level={'3'}>
        <Text category={'h6'} onPress={this.copyAddress} style={styles.address}>
          {this.props.address}
        </Text>
        <Text style={styles.addressSubtext}>tap to copy</Text>
        <Text category={'h4'} style={styles.balace}>
          {`Balance ${this.props.balance.toFixed(8)} NKN`}
        </Text>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  balace: {
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  address: {
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'center',
    marginTop: 20,
  },
  addressSubtext: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
