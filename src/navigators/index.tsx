import {Navigation} from 'react-native-navigation';
import {Provider} from 'react-redux';
import {Decimal} from 'decimal.js';

import store from '../../shared/redux/store';
import {registerScreens} from '../view/screens';
import {showSplash} from './navigation';

import {
  purgeStorage,
  rehydrateStore,
} from '../../shared/redux/actions/actionCreators';

declare var global: any;

/**
 * Register screens and components for react native navigation
 */
registerScreens({store, Provider});

console['disableYellowBox'] = true;

const app = () => {
  Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
      topBar: {visible: true},
    });

    console.log('initiating app');
    // Decimal.set({toExpPos: 20});
    //  store.dispatch(purgeStorage());
    setTimeout(showSplash, 0);
    // showSplash();
  });
};

export default app;
