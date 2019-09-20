import * as React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {ScrollView, StyleSheet, View, TextInput} from 'react-native';
import {Provider} from 'react-redux';
import {
  List,
  ListItem,
  Button,
  Text,
  Layout,
  Input,
} from 'react-native-ui-kitten';
import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from '../../../../shared/redux/store';

import {CText} from '../../elements/custom';
import {BUTTON_DEFAULT} from '../../elements/buttons';
import {Navigation} from 'react-native-navigation';
import {GLOBAL} from '../../styles/global';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {TouchableOpacity} from 'react-native-gesture-handler';
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
}

const publicKeyLength = 64;
const allowedCharacters = '0123456789abcdefABCDEF'.split('');

class AddContact extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    console.log(props);
    this.state = {
      contactId: '',
      nickname: '',
      caption: '',
      status: '',
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
    console.log(e);
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
        <Text style={{marginBottom: 30}}>Scan contact id</Text>
        <View style={{padding: 10}}>
          {/* <QRCodeScanner
            onRead={this.onScan}
            // topContent={
            //   <Text style={styles.centerText}>
            //     Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
            //   </Text>
            // }
            // bottomContent={
            //   <TouchableOpacity style={styles.buttonTouchable}>
            //     <Text style={styles.buttonText}>OK. Got it!</Text>
            //   </TouchableOpacity>
            // }
          /> */}
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
    marginBottom: 20,
  },
});

export default AddContact;
