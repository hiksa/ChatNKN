import {ACTION_TYPES} from '../constants/actionTypes';
import MESSAGE_TYPES from '../constants/messageTypes';
import {
  showLoginScreen,
  tabbedNavigation,
  showRegisterScreen,
} from '../../../src/navigators/navigation';

import * as nknWallet from 'nkn-wallet';
import {SCREENS} from '../../../src/constants/screen';
import {Navigation} from 'react-native-navigation';
import RNLocalNotifications from 'react-native-local-notifications';
import {setBalance, confirmTransaction} from './walletActionCreators';
import {receiveMessage, markReceived} from './chatActionCreators';
import {
  addContactSuccess,
  updateContactImage,
  addContactInvitationReceived as invitationReceived,
} from './contactsActionCreators';
import {Decimal} from 'decimal.js';
import configs from '../../misc/configs';
import {
  RegisterPayload,
  LoginAttemptPayload,
  UserPayload,
} from '../../models/payloads';

const nknClient = require('nkn-client');

const msgpack = require('msgpack-lite');
import * as RNFS from 'react-native-fs';

declare var window: any;

const initializeClient = (
  wallet: any,
  dispatch: Function,
  getState: Function,
) => {
  if (window.nknClient) {
    console.error('client initialized already');
  }

  console.log('*******INITIALIZING CLIENT*******');

  const seedNodeIndex = Math.floor(
    Math.random() * configs.seedAddresses.length,
  );

  const seedNode = configs.seedAddresses[seedNodeIndex];
  const seed = wallet.getSeed();
  const client = nknClient({
    seed: seed,
    seedRpcServerAddr: seedNode,
    responseTimeout: 5,
    numSubClients: 5,
    originalClient: false,
  });

  const publicKey = wallet.getPublicKey();

  client.on('connect', () => {
    console.log('connected');
  });

  client.on(
    'message',
    (
      fromUserId: string,
      message: any,
      payloadType: number,
      isEncrypted: boolean,
    ) => {
      if (payloadType == nknClient.PayloadType.TEXT) {
      } else if (payloadType == nknClient.PayloadType.BINARY) {
        const decoded = msgpack.decode(message);
        switch (decoded.type) {
          case MESSAGE_TYPES.CHAT.MESSAGE: {
            const messageContents = decoded.text;
            const payload = {
              text: messageContents,
              createdAt: new Date(),
              user: {
                _id: fromUserId,
              },
              _id: decoded._id,
            };

            dispatch(receiveMessage(payload));
            return 'well received';
          }

          case MESSAGE_TYPES.CHAT.MESSAGE_SEEN: {
            const messageId = decoded._id;
            const chatId = fromUserId;
            const payload = {chatId, messageId, userId: publicKey};
            dispatch(markReceived(payload));
            break;
          }

          case MESSAGE_TYPES.CONTACT.ADD: {
            const invitationReceivedPayload = {
              contactId: fromUserId,
              userId: publicKey,
              username: decoded.username,
              requestReceivedOn: new Date(),
            };

            dispatch(invitationReceived(invitationReceivedPayload));
            break;
          }

          case MESSAGE_TYPES.CONTACT.ACCEPT: {
            const avatarDataBase64 = decoded.avatarData;
            const dirPath = `${RNFS.DocumentDirectoryPath}/avatars/${publicKey}`;
            debugger;
            RNFS.mkdir(dirPath)
              .then(x => {
                debugger;
                const filePath = `${dirPath}/${fromUserId}`;
                RNFS.writeFile(filePath, avatarDataBase64, 'base64')
                  .then(y => {
                    debugger;
                    dispatch(
                      addContactSuccess({
                        userId: publicKey,
                        contactId: fromUserId,
                        acceptedOn: new Date(),
                        avatarDataBase64,
                        path: filePath,
                      }),
                    );
                  })
                  .catch(err => {
                    debugger;
                  });
              })
              .catch(e => {
                debugger;
              });

            const avatarSource = getState().auth.currentUser.avatarSource;
            const avatarUri = avatarSource.uri;
            RNFS.readFile(avatarUri, 'base64').then((data: string) => {
              const encodedMessage = msgpack.encode({
                type: MESSAGE_TYPES.CONTACT.UPDATE_IMAGE,
                avatarData: data,
              });

              client
                .send(fromUserId, encodedMessage)
                .then(x => console.log(x))
                .catch(e => console.log(e));
            });

            break;
          }

          case MESSAGE_TYPES.CONTACT.UPDATE_IMAGE: {
            const avatarDataBase64 = decoded.avatarData;
            const dirPath = `${RNFS.DocumentDirectoryPath}/avatars/${publicKey}`;
            RNFS.mkdir(dirPath).then(x => {
              const filePath = `${dirPath}/${fromUserId}`;
              RNFS.writeFile(filePath, avatarDataBase64, 'base64').then(y => {
                dispatch(
                  updateContactImage({
                    userId: publicKey,
                    contactId: fromUserId,
                    avatarDataBase64,
                    path: filePath,
                  }),
                );
              });
            });

            break;
          }

          default:
            break;
        }
      }
    },
  );

  client.on('block', (block: any) => {
    // console.log('block received', block);
    const {transactions} = block;
    const unconfirmed = getState().wallet.txHistory[publicKey].filter(
      (x: any) => !x.confirmed,
    );

    unconfirmed.forEach((x: any) => {
      transactions.forEach((y: any) => {
        if (x.txId == y.hash) {
          dispatch(confirmTransaction({txId: x.txId}));
        }
      });
    });
  });

  window.nknClient = client;
  window.nknWallet = wallet;
  wallet.getBalance().then((x: Decimal) => {
    const payload = {balance: x.toNumber(), address: wallet.address};
    dispatch(setBalance(payload));
  });
};

const create_UUID = () => {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(
    c,
  ) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

export const logout = () => {
  return (dispatch: Function, getState: Function) => {
    dispatch({type: ACTION_TYPES.AUTH.LOGOUT});
    showLoginScreen();
  };
};

export const initiateApp = () => {
  return (dispatch: Function, getState: Function) => {
    const {currentUser, savedUsers} = getState().auth;
    if (currentUser.userId) {
      const wallet = nknWallet.loadJsonWallet(
        currentUser.walletJSON,
        currentUser.password,
      );

      initializeClient(wallet, dispatch, getState);

      return tabbedNavigation();
    } else if (savedUsers && savedUsers.length) {
      return showLoginScreen();
    } else {
      return showRegisterScreen();
    }
  };
};

export const loginAttempt = (payload: LoginAttemptPayload) => {
  return (dispatch: Function, getState: Function) => {
    const authState = getState().auth;
    const savedUser = authState.savedUsers.find(
      (x: any) => x.username == payload.username,
    );

    if (savedUser) {
      try {
        const wallet = nknWallet.loadJsonWallet(
          savedUser.walletJSON,
          payload.password,
        );

        initializeClient(wallet, dispatch, getState);

        tabbedNavigation();
        dispatch(loginSuccess(savedUser));
      } catch (e) {
        dispatch(loginFail(payload));
      }
    } else {
      dispatch(loginFail(payload));
    }
  };
};

export const loginSuccess = (payload: UserPayload) => {
  return {
    type: ACTION_TYPES.AUTH.LOGIN_SUCCESS,
    payload,
  };
};

export const loginFail = (payload: any) => {
  return {
    type: ACTION_TYPES.AUTH.LOGIN_FAIL,
    payload,
  };
};

export const register = (payload: RegisterPayload, ownProps: any) => {
  return (dispatch: Function, getState: Function) => {
    const authState = getState().auth;
    const userExists = authState.savedUsers.some(
      (x: any) => x.username == payload.username,
    );

    if (userExists) {
      dispatch(registerFail(payload));
    } else {
      const wallet = nknWallet.newWallet(payload.password);
      initializeClient(wallet, dispatch, getState);

      Navigation.push(ownProps.componentId, {
        component: {
          name: SCREENS.Auth.Faucet,
        },
      });

      dispatch(
        registerSuccess({
          userId: wallet.getPublicKey(),
          username: payload.username,
          address: wallet.address,
          walletJSON: wallet.toJSON(),
          password: payload.password,
        }),
      );
    }
  };
};

export const registerSuccess = (payload: any) => {
  return {
    type: ACTION_TYPES.AUTH.REGISTER_SUCCESS,
    payload,
  };
};

export const registerFail = (payload: RegisterPayload) => {
  return {
    type: ACTION_TYPES.AUTH.REGISTER_FAIL,
    payload,
  };
};

export const setImage = (payload: any) => {
  return {
    type: ACTION_TYPES.SETTINGS.SET_IMAGE,
    payload,
  };
};
