import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Clipboard from '@react-native-community/react-native-clipboard';

import {goToClaim} from '../../../navigators/navigation';
import QRCode from 'react-native-qrcode-svg';
import {Layout, Button, Avatar} from 'react-native-ui-kitten';
import {ScrollView} from 'react-native-gesture-handler';
import {Navigation} from 'react-native-navigation';
import {SCREENS} from '../../../constants/screen';
import Toast from 'react-native-root-toast';

export interface Props {
  navigation: any;
  logout: Function;
  userId: string;
  username: string;
  avatarSource: any;
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

  handleEditUsername = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: SCREENS.Settings.EditUsername,
        options: {
          topBar: {
            drawBehind: false,
            visible: true,
            title: {
              text: 'Edit Username',
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
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 20,
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Avatar
                style={{width: 32, height: 32}}
                source={
                  this.props.avatarSource
                    ? {uri: this.props.avatarSource.uri}
                    : require('../../assets/images/avatar.png')
                }
              />
              <Text
                category={'h4'}
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginLeft: 10,
                }}>
                {this.props.username}
              </Text>
            </View>
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
          <Button style={{marginTop: 30}} onPress={() => goToClaim()}>
            Claim NKN
          </Button>
          <View style={{flexDirection: 'row'}}>
            <Button
              appearance={'outline'}
              style={{marginTop: 20, marginRigt: 10, flex: 1}}
              onPress={this.handleEditUsername}>
              Edit Username
            </Button>
            <Button
              appearance={'outline'}
              style={{marginTop: 20, marginLeft: 10, flex: 1}}
              onPress={this.handleEdit}>
              Edit Avatar
            </Button>
          </View>
          <Button style={{marginTop: 40}} onPress={() => this.props.logout()}>
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
