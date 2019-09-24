import * as React from 'react';
import {Navigation} from 'react-native-navigation';
import {tabbedNavigation} from '../../../navigators/navigation';
import {SCREENS} from '../../../constants/screen';
import {Layout, Text, Button, Input} from 'react-native-ui-kitten';

export interface Props {
  navigation: any;
  login: Function;
  componentId: string;
}

interface State {
  username: string;
  password: string;
}

export default class Login extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  componentDidMount() {}

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
          value={this.state.username}
        />

        <Input
          size={'small'}
          style={{marginTop: 10}}
          placeholder={'Password'}
          onChangeText={(text: string) => this.setState({password: text})}
          value={this.state.password}
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
