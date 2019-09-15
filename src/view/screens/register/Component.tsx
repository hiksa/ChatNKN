import * as React from 'react';
import {View, Image, SafeAreaView, Button, TextInput} from 'react-native';

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

import {tabbedNavigation} from '../../../navigators/navigation';
import {BUTTON_DEFAULT} from '../../elements/buttons';
import {CText} from '../../elements/custom';
import store, {persistor} from '../../../../shared/redux/store';
import {Layout, Text, Input} from 'react-native-ui-kitten';

export interface Props {
  register: Function;
}

interface State {
  username: string;
  password: string;
  repeatPassword: string;
}

class Register extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      repeatPassword: '',
    };
  }

  componentDidMount() {}

  navigateToHome = () => {
    tabbedNavigation();
  };

  handleRegisterSubmit = () => {
    this.props.register(this.state);
  };

  render() {
    return (
      <Layout style={{padding: 20}}>
        <Text style={{paddingBottom: 20, fontSize: 30, textAlign: 'center'}}>
          Register
        </Text>

        <Input
          placeholder={'Username'}
          onChangeText={(text: string) => this.setState({username: text})}
          value={this.state.username}
        />
        <Input
          secureTextEntry={true}
          placeholder={'Password'}
          onChangeText={(text: string) => this.setState({password: text})}
          value={this.state.password}
        />
        <Input
          secureTextEntry={true}
          placeholder={'Repeat password'}
          onChangeText={(text: string) => this.setState({repeatPassword: text})}
          value={this.state.repeatPassword}
        />
        <Button
          style={{marginTop: 20, marginBottom: 20, textAlign: 'center'}}
          title="Submit"
          onPress={this.handleRegisterSubmit}>
          Submit
        </Button>
      </Layout>
    );
  }
}

export default Register;
