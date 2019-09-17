import {Navigation} from 'react-native-navigation';

import {SCREENS} from '../constants/screen';
import {TYPOGRAPHY} from '../view/styles/typography';

export const showSplash = () => {
  Navigation.setRoot({
    root: {
      component: {name: SCREENS.Splash},
    },
  });
};

export const showRegisterScreen = () => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'Auth',
        children: [{component: {name: SCREENS.Auth.Register}}],
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    },
  });
};

export const goToClaim = () => {
  Navigation.setRoot({
    root: {
      stack: {
        // id: 'Auth',
        children: [{component: {name: SCREENS.Auth.Faucet}}],
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    },
  });
};

export const showLoginScreen = () => {
  Navigation.setRoot({
    root: {
      stack: {
        id: 'Auth',
        children: [{component: {name: SCREENS.Auth.Login}}],
        options: {
          topBar: {
            visible: false,
          },
        },
      },
    },
  });
};

export const tabbedNavigation = () =>
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BottomTabsId',
        children: [
          {
            stack: {
              children: [
                {
                  component: {
                    name: SCREENS.Tabs.Home,
                    passProps: {
                      text: 'This is Home',
                    },
                  },
                },
              ],
              options: {
                topBar: {
                  visible: true,
                  drawBehind: false,
                  title: {
                    text: 'Chat',
                  },
                  rightButtons: [
                    {
                      id: 'myDynamicButton',
                      text: 'connected',
                      icon: require('../view/assets/images/connected.png'),
                    },
                  ],
                },
                bottomTab: {
                  fontSize: 12,
                  text: 'Chat',
                  textColor: TYPOGRAPHY.COLOR.Primary,
                  selectedTextColor: TYPOGRAPHY.COLOR.Secondary,
                  icon: require('../view/assets/images/tabbar/chat.png'),
                  selectedIcon: require('../view/assets/images/tabbar/chat.png'),
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: SCREENS.Tabs.Wallet,
                  },
                },
              ],
              options: {
                topBar: {
                  visible: true,
                  drawBehind: false,
                  title: {
                    text: 'Wallet',
                  },
                  rightButtons: [
                    {
                      id: 'myDynamicButton',
                      text: 'connected',
                      icon: require('../view/assets/images/connected.png'),
                    },
                  ],
                },
                bottomTab: {
                  text: 'Wallet',
                  fontSize: 12,
                  textColor: TYPOGRAPHY.COLOR.Primary,
                  selectedTextColor: TYPOGRAPHY.COLOR.Secondary,
                  icon: require('../view/assets/images/tabbar/wallet.png'),
                  selectedIcon: require('../view/assets/images/tabbar/wallet.png'),
                },
              },
            },
          },
          {
            stack: {
              children: [
                {
                  component: {
                    name: SCREENS.Tabs.Settings,
                  },
                },
              ],
              options: {
                topBar: {
                  visible: true,
                  drawBehind: false,
                  title: {
                    text: 'Settings',
                  },
                  rightButtons: [
                    {
                      id: 'myDynamicButton',
                      text: 'connected',
                      icon: require('../view/assets/images/connected.png'),
                    },
                  ],
                },
                bottomTab: {
                  text: 'Settings',
                  fontSize: 12,
                  textColor: TYPOGRAPHY.COLOR.Primary,
                  selectedTextColor: TYPOGRAPHY.COLOR.Secondary,
                  icon: require('../view/assets/images/tabbar/settings.png'),
                  selectedIcon: require('../view/assets/images/tabbar/settings.png'),
                },
              },
            },
          },
        ],
      },
    },
  });

export default tabbedNavigation;
