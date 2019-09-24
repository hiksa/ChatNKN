import {Navigation} from 'react-native-navigation';
import {Provider, ConnectedComponentClass} from 'react-redux';
import React from 'react';
import {PersistGate} from 'redux-persist/integration/react';
import {mapping, light as lightTheme} from '@eva-design/eva';
import store, {persistor} from '../../shared/redux/store';

import {ApplicationProvider} from 'react-native-ui-kitten';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

import {SCREENS} from '../../constants/screen';

import * as Splash from './splash';
import * as Login from './login';
import * as Register from './register';
import * as RegisterSuccess from './register-success';
import * as Faucet from './faucet';
import * as Success from './faucet-success';
import * as AvatarSelect from './avatar-select';
import * as Home from './home';
import * as Chat from './chat';
import * as Wallet from './wallet';
import * as Settings from './settings';
import * as EditProfile from './edit-profile';
import * as AddContact from './add-contact';
import * as WalletSend from './wallet-send';
import * as WalletReceive from './wallet-receive';

const registerComponent = (redux: any) => (
  name: string,
  Component: ConnectedComponentClass<any, any>,
) => {
  Navigation.registerComponent(
    name,
    () => (props: any) => (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ApplicationProvider mapping={mapping} theme={lightTheme}>
            {/* <IconRegistry icons={EvaIconsPack} /> */}
            <Component {...props} />
          </ApplicationProvider>
        </PersistGate>
      </Provider>
    ),
    () => Component,
  );
};

export function registerScreens(redux: any) {
  registerComponent(redux)(SCREENS.Splash, Splash.default);

  registerComponent(redux)(SCREENS.Auth.Login, Login.default);
  registerComponent(redux)(SCREENS.Auth.Register, Register.default);
  registerComponent(redux)(
    SCREENS.Auth.RegisterSuccess,
    RegisterSuccess.default,
  );
  registerComponent(redux)(SCREENS.Auth.Faucet, Faucet.default);
  registerComponent(redux)(SCREENS.Auth.FaucetSuccess, Success.default);
  registerComponent(redux)(SCREENS.Auth.AvatarSelect, AvatarSelect.default);

  registerComponent(redux)(SCREENS.Tabs.Home, Home.default);
  registerComponent(redux)(SCREENS.Tabs.Chat, Chat.default);
  registerComponent(redux)(SCREENS.Tabs.Wallet, Wallet.default);
  registerComponent(redux)(SCREENS.Tabs.Settings, Settings.default);

  registerComponent(redux)(SCREENS.Contacts.Add, AddContact.default);

  registerComponent(redux)(SCREENS.Wallet.Send, WalletSend.default);
  registerComponent(redux)(SCREENS.Wallet.Receive, WalletReceive.default);

  registerComponent(redux)(SCREENS.Settings.Edit, EditProfile.default);
}
