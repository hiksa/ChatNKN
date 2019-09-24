import * as React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {Button, Text, Layout, Input} from 'react-native-ui-kitten';
import {Navigation} from 'react-native-navigation';
import {GLOBAL} from '../../styles/global';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

export interface Props {
  userId: string;
  addContact: Function;
  componentId: string;
  existingContacts: string[];
}

interface State {
  contactId: string;
  nickname: string;
  caption: string;
  status: string;
  cameraOn: boolean;
}

const publicKeyLength = 64;
const allowedCharacters = '0123456789abcdefABCDEF'.split('');

class AddContact extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      contactId: '',
      nickname: '',
      caption: '',
      status: '',
      cameraOn: false,
    };
  }

  componentDidMount() {
    this.handleAddContact = this.handleAddContact.bind(this);
  }

  handleAddContact = () => {
    if (this.state.contactId.length == publicKeyLength) {
      this.props.addContact(this.props.userId, {
        userId: this.state.contactId,
        username: this.state.nickname,
      });
    } else {
      // TODO: Invalid user id
    }
  };

  handleCancel = () => {
    Navigation.pop(this.props.componentId);
  };

  onScan = (e: any) => {
    alert(e.data);
    console.log(e);
    debugger;
  };

  getCaption = (text: string) => {
    if (!text || !text.length) {
      return '';
    }

    if (this.isAdded(text)) {
      return 'A contact with this Id is already added to your contacts list.';
    }

    if (text.length != publicKeyLength) {
      return `The contact Id should be exactly ${publicKeyLength} characters long.`;
    }

    if (this.containsIllegalCharacters(text)) {
      return 'Contains illegal characters.';
    }

    return '';
  };

  containsIllegalCharacters = (text: string) => {
    let i = text.length;
    while (i--) {
      let current = text.charAt(i);
      if (!allowedCharacters.includes(current)) {
        return true;
      }
    }

    return false;
  };

  isAdded = (text: string) =>
    this.props.existingContacts.find(x => x == text) != null;

  getStatus = (text: string) => {
    if (!text || !text.length) {
      return '';
    }

    if (
      text.length != publicKeyLength ||
      this.isAdded(text) ||
      this.containsIllegalCharacters(text)
    ) {
      return 'danger';
    }

    return 'primary';
  };

  get getAddButtonDisabled() {
    const text = this.state.contactId;
    if (
      !text ||
      !text.length ||
      text.length != publicKeyLength ||
      this.isAdded(text) ||
      this.containsIllegalCharacters(text)
    ) {
      return true;
    }

    return false;
  }

  handleContactIdChangeText = (text: string) => {
    const lowered = text.toLowerCase();
    this.setState({
      contactId: lowered,
      status: this.getStatus(lowered),
      caption: this.getCaption(lowered),
    });
  };

  toggleCamera = () => {
    this.setState({cameraOn: !this.state.cameraOn});
  };

  renderCamera = () => {
    if (this.state.cameraOn) {
      return (
        <QRCodeScanner
          cameraStyle={{
            width: 280,
            height: 280,
            marginTop: 10,
            alignSelf: 'center',
            justifyContent: 'center',
          }}
          cameraProps={{
            ratio: '1:1',
          }}
          onRead={this.onScan.bind(this)}
          showMarker={true}
          vibrate={true}
          reactivateTimeout={300}
        />
      );
    } else {
      return null;
    }
  };

  render() {
    return (
      <Layout style={[{flex: 1, padding: 20}]}>
        <Layout level={'3'} style={{padding: 10}}>
          <Input
            size={'small'}
            caption={this.state.caption}
            status={this.state.status}
            placeholder={'Contact Id'}
            onChangeText={this.handleContactIdChangeText}
            value={this.state.contactId}
          />

          <Input
            size={'small'}
            style={{marginTop: 10}}
            caption={'Nickname is optional'}
            placeholder={'Nickname'}
            onChangeText={(text: string) => this.setState({nickname: text})}
            value={this.state.nickname}
          />

          <View style={styles.buttonsContainer}>
            <Button
              size={'medium'}
              disabled={this.getAddButtonDisabled}
              onPress={this.handleAddContact}>
              Add
            </Button>
            <Button
              size={'medium'}
              appearance={'outline'}
              onPress={this.handleCancel}>
              Cancel
            </Button>
          </View>
        </Layout>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={this.toggleCamera} style={{marginTop: 10}}>
            <Text style={{textDecorationLine: 'underline', color: '#3366FF'}}>
              Scan QR code
            </Text>
          </TouchableOpacity>
          {this.renderCamera()}
        </View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default AddContact;
