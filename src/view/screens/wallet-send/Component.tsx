import * as React from 'react';
import {View, TextInput, ScrollView, StyleSheet, ViewProps} from 'react-native';
import {Navigation} from 'react-native-navigation';
import QRCodeScanner from 'react-native-qrcode-scanner';
import ContactListItem from '../home/contactListItem';
import * as nknWallet from 'nkn-wallet';
import {
  Button,
  Text,
  Input,
  Layout,
  List,
  Modal,
  Avatar,
  TabView,
  Tab,
} from 'react-native-ui-kitten';
import {RNCamera, Orientation, RNCameraProps} from 'react-native-camera';

export interface Props {
  userId: string;
  balance: number;
  address: string;
  contacts: any[];
  attemptSend: Function;
  componentId: string;
}

interface State {
  toAddress: string;
  amount: string;
  filteredContacts: any[];
  modalVisible: boolean;
  selectedContact: any;
  selectedTab: number;
}

export default class WalletSend extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      toAddress: '',
      amount: '',
      filteredContacts: [...props.contacts],
      modalVisible: false,
      selectedContact: null,
      selectedTab: 0,
    };
  }

  componentDidMount() {}

  handleSend = () => {
    const amount = parseFloat(this.state.amount);
    if (isNaN(amount)) {
      return;
    }

    if (amount == 0) {
      // TODO: Cannot send 0
      return;
    }

    if (amount > this.props.balance) {
      // TODO: Insufficient funds
      return;
    }

    if (!nknWallet.verifyAddress(this.state.toAddress)) {
      // TODO: Invalid address
      return;
    }

    this.toggleModal();
    return;
  };

  handleCancel = () => {
    Navigation.pop(this.props.componentId);
  };

  selectContact = (address: string) => {
    const contact = this.props.contacts.find(x => x.address == address);
    this.setState({toAddress: address, selectedContact: contact});
  };

  onScan = (e: any) => {
    alert(e);
    console.log(e);
  };

  handleMaxPress = () => {
    const amount = this.props.balance.toFixed(8).toString();
    this.setState({amount: amount});
  };

  toggleModal = () => {
    const currentState = this.state.modalVisible;
    this.setState({modalVisible: !currentState});
  };

  confirmSend = () => {
    const payload = {
      from: this.props.address,
      to: this.state.toAddress,
      amount: this.state.amount,
      userId: this.props.userId,
    };

    this.toggleModal();
    this.props.attemptSend(payload, this.props.componentId);
  };

  renderModalElement = (): React.ReactElement<ViewProps> => {
    const contact = this.state.selectedContact;
    return (
      <Layout level="3" style={styles.modalContainer}>
        <View style={{marginBottom: 20}}>
          <Text style={{fontWeight: 'bold'}}>Important</Text>
          <Text category={'p2'}>
            Please review the details below. Once you press Send, the
            transaction cannot be reversed.
          </Text>
        </View>
        {contact == null ? (
          <View></View>
        ) : (
          <View style={{marginBottom: 10, flexDirection: 'row'}}>
            <Avatar
              source={
                contact.path
                  ? {uri: 'file://' + contact.path}
                  : require('../../assets/images/avatar.png')
              }
            />
            <View style={{flex: 7, marginLeft: 15}}>
              <Text>{contact.username}</Text>
            </View>
          </View>
        )}
        <View style={{marginBottom: 20}}>
          <Text category={'p2'} style={{fontStyle: 'italic'}}>
            Receiving address
          </Text>
          <Text style={{fontWeight: 'bold'}}>{this.state.toAddress}</Text>
          <Text category={'p2'} style={{fontStyle: 'italic', marginTop: 10}}>
            Amount
          </Text>
          <Text style={{fontWeight: 'bold'}}>{this.state.amount} NKN</Text>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Button onPress={this.confirmSend}>Send</Button>
          <Button appearance={'outline'} onPress={this.toggleModal}>
            Close
          </Button>
        </View>
      </Layout>
    );
  };

  render() {
    return (
      <Layout style={[{flex: 1, padding: 20}, StyleSheet.absoluteFill]}>
        <ScrollView>
          <Modal
            visible={this.state.modalVisible}
            allowBackdrop={true}
            backdropStyle={{backgroundColor: 'black', opacity: 0.5}}
            onBackdropPress={this.toggleModal}>
            {this.renderModalElement()}
          </Modal>
          <Layout style={{padding: 10}} level={'3'}>
            <View>
              <View style={styles.amountContainer}>
                <Input
                  style={{flex: 3}}
                  size={'small'}
                  placeholder={'Receiving address'}
                  onChangeText={(text: string) =>
                    this.setState({toAddress: text})
                  }
                  value={this.state.toAddress}
                />
                <Input
                  style={{flex: 1, marginLeft: 10}}
                  size={'small'}
                  placeholder={'Amount'}
                  onChangeText={(text: string) => this.setState({amount: text})}
                  keyboardType={'numeric'}
                  value={this.state.amount}
                />
              </View>
              <View style={styles.balanceContainer}>
                <Text category={'p1'} style={styles.balanceText}>
                  Balance {this.props.balance.toFixed(8)} NKN
                </Text>
                <View style={{flexDirection: 'row-reverse'}}>
                  <Button
                    status={'info'}
                    size={'small'}
                    style={{height: 30}}
                    disabled={
                      parseFloat(this.state.amount) == this.props.balance
                    }
                    onPress={this.handleMaxPress}>
                    max
                  </Button>
                  <Button
                    status={'primary'}
                    appearance={'outline'}
                    size={'small'}
                    style={styles.clearButton}
                    disabled={this.state.amount == ''}
                    onPress={() => this.setState({amount: ''})}>
                    x clear
                  </Button>
                </View>
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <Button onPress={this.handleSend} style={{width: 120}}>
                Next
              </Button>
              <Button
                appearance={'outline'}
                onPress={this.handleCancel}
                style={{width: 120}}>
                Cancel
              </Button>
            </View>
          </Layout>
          <TabView
            style={{marginTop: 40}}
            selectedIndex={this.state.selectedTab}
            onSelect={(index: number) => this.setState({selectedTab: index})}>
            <Tab title="Select Contact">
              <View>
                <ScrollView style={{marginTop: 30}}>
                  <TextInput
                    onChangeText={(text: string) => {
                      const lowered = text.toLowerCase();
                      this.setState({
                        filteredContacts: this.props.contacts.filter(
                          x =>
                            x.userId.toLowerCase().includes(lowered) ||
                            x.address.toLowerCase().includes(lowered) ||
                            x.username.toLowerCase().includes(lowered),
                        ),
                      });
                    }}
                    placeholder={'Filter contacts'}
                  />
                  <List
                    style={{marginTop: 20}}
                    data={this.state.filteredContacts}
                    keyExtractor={(item: any) => item.userId}
                    renderItem={({item}) => (
                      <ContactListItem
                        path={item.path}
                        imageData={item.avatarDataBase64}
                        handleClick={this.selectContact}
                        username={item.username}
                        userId={item.address}
                        lastMessageText={item.lastMessageText}
                        lastMessageSent={item.lastMessageSent}
                        hasUnreadMessages={item.hasUnreadMessages}
                      />
                    )}
                  />
                </ScrollView>
              </View>
            </Tab>
            <Tab title="Scan QR">
              <View>
                <QRCodeScanner
                  cameraStyle={{
                    width: 280,
                    height: 280,
                    marginTop: 10,
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}
                  cameraProps={{ratio: '1:1'}}
                  onRead={this.onScan}
                  showMarker={true}
                  vibrate={true}
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
                />
              </View>
            </Tab>
          </TabView>
        </ScrollView>
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
    justifyContent: 'space-between',
    marginTop: 20,
  },
  amountContainer: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  balanceText: {
    marginTop: 5,
    marginRight: 10,
    fontWeight: 'bold',
  },
  balanceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalContainer: {
    padding: 20,
    width: 380,
  },
  clearButton: {
    height: 30,
    marginRight: 10,
  },
});
