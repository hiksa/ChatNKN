import * as React from 'react';
import {View, Text, TouchableHighlight, StyleSheet} from 'react-native';
import Clipboard from '@react-native-community/react-native-clipboard';

import {goToClaim} from '../../../navigators/navigation';
import QRCode from 'react-native-qrcode-svg';
import {Layout, Button} from 'react-native-ui-kitten';
import {ScrollView} from 'react-native-gesture-handler';
import {Navigation} from 'react-native-navigation';
import {SCREENS} from '../../../constants/screen';
import Toast from 'react-native-root-toast';

export interface Props {
  navigation: any;
  logout: Function;
  userId: string;
  address: string;
  componentId: string;
}

interface State {}

export default class Settings extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {}

  handleCopyUserId = (e: any) => {
    Clipboard.setString(this.props.userId);
    Toast.show('Id copied to clipboard.', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
    });

    return true;
  };

  handleEdit = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: SCREENS.Settings.Edit,
        options: {
          topBar: {
            drawBehind: false,
            visible: true,
            title: {
              text: 'Edit Avatar',
            },
          },
        },
      },
    });
  };

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <Layout style={{padding: 20}}>
          <Layout level={'3'} style={{padding: 20, paddingBottom: 50}}>
            <Layout
              level={'3'}
              onStartShouldSetResponder={this.handleCopyUserId}>
              <Text style={{textAlign: 'center'}}>{this.props.userId}</Text>
              <Text style={styles.userIdText}>tap to copy User Id</Text>
            </Layout>
            <View
              style={styles.qrContainer}
              onStartShouldSetResponder={this.handleCopyUserId}>
              <QRCode value={this.props.userId} size={200} />
            </View>
          </Layout>
          <Button
            appearance={'outline'}
            style={{marginTop: 30}}
            onPress={() => goToClaim()}>
            Claim NKN
          </Button>
          <Button
            appearance={'outline'}
            style={{marginTop: 20}}
            onPress={this.handleEdit}>
            Edit Avatar
          </Button>
          <Button style={{marginTop: 30}} onPress={() => this.props.logout()}>
            Logout
          </Button>
        </Layout>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  qrContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  userIdText: {
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
