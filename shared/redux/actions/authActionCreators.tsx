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
import {receiveMessage} from './chatActionCreators';
import {Decimal} from 'decimal.js';
import configs from '../../misc/configs';

const nknClient = require('nkn-client');

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
    responseTimeout: 100,
    numSubClients: 5,
    originalClient: false,
  });

  const publicKey = wallet.getPublicKey();

  client.on('connect', () => {
    console.log('connected');
    // client.ws.onmessage = (event: any) => {
    //   let msg = JSON.parse(event.data);

    //   console.log(msg);
    // };
  });

  client.on(
    'message',
    (fromUserId: any, message: any, payloadType: any, isEncrypted: boolean) => {
      // alert(`message, fromUserId: ${fromUserId}, message: ${message}`);
      if (payloadType == nknClient.PayloadType.TEXT) {
        if (message.startsWith(MESSAGE_TYPES.CHAT.MESSAGE)) {
          const messageContents = message.substr(
            MESSAGE_TYPES.CHAT.MESSAGE.length,
          );

          const payload = {
            text: messageContents,
            createdAt: new Date(),
            user: {
              _id: fromUserId,
            },
            _id: create_UUID(),
          };

          dispatch(receiveMessage(payload));
          return 'well received';
        } else if (message.startsWith(MESSAGE_TYPES.CONTACT.ADD)) {
          const username = message.substr(MESSAGE_TYPES.CONTACT.ADD.length);
          const payload = {
            username: username,
            userId: fromUserId,
            date: new Date(),
          };

          // TODO: Dispatch action
          return 'well received';
        } else if (message.startsWith(MESSAGE_TYPES.CONTACT.ACCEPT)) {
          // TODO: Friend request accepted
        } else if (message.startsWith(MESSAGE_TYPES.CONTACT.DECLINE)) {
          // TODO: Friend request declined
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

export const loginAttempt = (payload: any) => {
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

export const loginSuccess = (payload: any) => {
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

export const register = (payload: any, ownProps: any) => {
  return (dispatch: Function, getState: Function) => {
    const authState = getState().auth;
    const userExists =
      authState.savedUsers.filter((x: any) => x.username == payload.username)
        .length != 0;
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

export const registerFail = (payload: any) => {
  return {
    type: ACTION_TYPES.AUTH.REGISTER_FAIL,
    payload,
  };
};
