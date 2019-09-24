import {ACTION_TYPES} from '../constants/actionTypes';
import {
  showLoginScreen,
  tabbedNavigation,
  showRegisterScreen,
} from '../../../navigators/navigation';

import {SCREENS} from '../../../constants/screen';
import {Navigation} from 'react-native-navigation';
import {
  RegisterPayload,
  LoginAttemptPayload,
  UserPayload,
} from '../../models/payloads';
import {AppState} from '../reducers';
import NknService from '../../misc/nkn';
import * as nknWallet from 'nkn-wallet';
import Toast from 'react-native-root-toast';

export const logout = () => {
  return (dispatch: Function, getState: () => AppState) => {
    // NknService.client = null;
    // NknService.wallet = null;

    // dispatch({type: ACTION_TYPES.AUTH.LOGOUT});

    showLoginScreen().then(() => {
      dispatch({type: ACTION_TYPES.AUTH.LOGOUT});
      NknService.client = null;
      NknService.wallet = null;
    });
  };
};

export const initiateApp = () => {
  return (dispatch: Function, getState: () => AppState) => {
    const {currentUser, savedUsers} = getState().auth;
    if (currentUser.userId) {
      const wallet = nknWallet.loadJsonWallet(
        currentUser.walletJSON,
        currentUser.password,
      );

      NknService.initializeClient(wallet, dispatch, getState);

      return tabbedNavigation();
    } else if (savedUsers && savedUsers.length) {
      return showLoginScreen();
    } else {
      return showRegisterScreen();
    }
  };
};

export const loginAttempt = (payload: LoginAttemptPayload) => {
  return (dispatch: Function, getState: () => AppState) => {
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

        NknService.initializeClient(wallet, dispatch, getState);

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
  return (dispatch: Function, getState: () => AppState) => {
    const authState = getState().auth;
    const userExists = authState.savedUsers.some(
      (x: any) => x.username == payload.username,
    );

    if (userExists) {
      dispatch(registerFail(payload));
    } else {
      const wallet = nknWallet.newWallet(payload.password);
      NknService.initializeClient(wallet, dispatch, getState);

      Navigation.push(ownProps.componentId, {
        component: {
          name: SCREENS.Auth.RegisterSuccess,
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
  return (dispatch: Function, getState: () => AppState) => {
    Toast.show('Avatar updated.', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
    });

    dispatch({
      type: ACTION_TYPES.SETTINGS.SET_IMAGE,
      payload,
    });
  };
};
