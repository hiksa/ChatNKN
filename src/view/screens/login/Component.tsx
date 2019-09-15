import * as React from 'react';
import {View, Image, SafeAreaView, TextInput} from 'react-native';

import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from '../../../../shared/redux/store';
import {Provider} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import {tabbedNavigation} from '../../../navigators/navigation';
import {BUTTON_DEFAULT} from '../../elements/buttons';
import {CText} from '../../elements/custom';
import {SCREENS} from '../../../constants/screen';
import {Layout, Text, Button, Input} from 'react-native-ui-kitten';

export interface Props {
  navigation: any;
  login: Function;
  purge: Function;
  componentId: string;
}

interface State {
  username: string;
  password: string;
}

class Login extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {
    //   this.props.purge();
  }

  navigateToHome = () => {
    tabbedNavigation();
  };

  handleLoginSubmit = () => {
    this.props.login(this.state);
  };

  goToRegister = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: SCREENS.Auth.Register,
      },
    });
  };

  render() {
    return (
      <Layout style={{flex: 1, padding: 20}}>
        <Text
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            fontSize: 30,
            textAlign: 'center',
          }}>
          Log in
        </Text>

        <Input
          size={'small'}
          placeholder={'Username'}
          onChangeText={(text: string) => this.setState({username: text})}
        />

        <Input
          size={'small'}
          style={{marginTop: 10}}
          placeholder={'Password'}
          onChangeText={(text: string) => this.setState({password: text})}
          secureTextEntry={true}
        />

        <Button
          style={{
            marginTop: 20,
            marginBottom: 20,
            textAlign: 'center',
          }}
          title="Login"
          onPress={this.handleLoginSubmit}>
          Login
        </Button>

        <Text
          style={{
            paddingTop: 20,
            paddingBottom: 20,
          }}>
          Don't have an account yet? Go ahead and register.
        </Text>

        <Button
          appearance={'outline'}
          style={{
            marginTop: 20,
            marginBottom: 20,
            textAlign: 'center',
          }}
          onPress={this.goToRegister}>
          Register
        </Button>
      </Layout>
    );
  }
}

export default Login;
