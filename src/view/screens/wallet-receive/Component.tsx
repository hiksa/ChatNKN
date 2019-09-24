import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Navigation} from 'react-native-navigation';
import QRCode from 'react-native-qrcode-svg';
import {Layout, Text, Button} from 'react-native-ui-kitten';

export interface Props {
  address: string;
  componentId: string;
}

interface State {}

export default class WalletReceive extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  handleCancel = () => {
    Navigation.pop(this.props.componentId);
  };

  render() {
    return (
      <Layout style={[{flex: 1, padding: 20}, StyleSheet.absoluteFill]}>
        <Layout style={[{padding: 10}]} level={'3'}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 60,
            }}>
            <Text category={'h5'} style={{marginBottom: 60, marginTop: 20}}>
              Scan QR code with a wallet app
            </Text>
            <QRCode value={this.props.address} size={200} />
          </View>
          <Button appearance="outline" onPress={this.handleCancel}>
            Back
          </Button>
        </Layout>
      </Layout>
    );
  }
}
