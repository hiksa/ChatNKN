import * as React from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import Clipboard from '@react-native-community/react-native-clipboard';

import styles from './styles';
import {CText} from '../../elements/custom';
import {BUTTON_DEFAULT} from '../../elements/buttons';
import store, {persistor} from '../../../../shared/redux/store';
import {goToClaim} from '../../../navigators/navigation';
import QRCode from 'react-native-qrcode-svg';
import {Layout, Button} from 'react-native-ui-kitten';
import {ScrollView} from 'react-native-gesture-handler';

export interface Props {
  navigation: any;
  logout: Function;
  userId: string;
  address: string;
}

interface State {}

class Settings extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {}

  handleLogout = () => {
    this.props.logout();
  };

  handleCopyUserId = (e: any) => {
    Clipboard.setString(this.props.userId);
    return true;
  };

  handleClaim = () => {
    goToClaim();
  };

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <Layout style={{padding: 20}}>
          <Layout
            level={'3'}
            style={{padding: 20, paddingBottom: 50}}
            onStartShouldSetResponder={this.handleCopyUserId}>
            <Text style={{textAlign: 'center'}}>{this.props.userId}</Text>
            <Text
              style={{
                marginTop: 10,
                fontSize: 12,
                fontStyle: 'italic',
                textAlign: 'center',
              }}>
              tap to copy User Id
            </Text>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 60,
              }}>
              <QRCode value={this.props.userId} size={250} />
            </View>
          </Layout>
          <Button
            appearance={'outline'}
            style={{marginTop: 30}}
            title="Claim"
            onPress={this.handleClaim}>
            Claim NKN
          </Button>
          <Button style={{marginTop: 30}} onPress={this.handleLogout}>
            Logout
          </Button>
        </Layout>
      </ScrollView>
    );
  }
}

export default Settings;
