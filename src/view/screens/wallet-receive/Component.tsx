import * as React from 'react';
import {View, SafeAreaView, StyleSheet} from 'react-native';

import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from '../../../../shared/redux/store';
import {Provider} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import QRCode from 'react-native-qrcode-svg';
import {CText} from '../../elements/custom';
import {Layout, Text} from 'react-native-ui-kitten';

export interface Props {
  address: string;
  componentId: string;
}

interface State {}

class WalletReceive extends React.PureComponent<Props, State> {
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
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text category={'h4'} style={{marginBottom: 80, marginTop: 20}}>
              Scan this QR code with a wallet
            </Text>
            <QRCode value={this.props.address} size={250} />
          </View>
        </Layout>
      </Layout>
    );
  }
}

export default WalletReceive;
