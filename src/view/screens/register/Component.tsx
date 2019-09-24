import * as React from 'react';
import {tabbedNavigation} from '../../../navigators/navigation';
import {Layout, Text, Input, Button} from 'react-native-ui-kitten';

export interface Props {
  register: Function;
}

interface State {
  username: string;
  password: string;
  repeatPassword: string;
}

export default class Register extends React.PureComponent<Props, State> {
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
      <Layout style={{flex: 1, padding: 20}}>
        <Text
          style={{
            paddingTop: 20,
            paddingBottom: 20,
            fontSize: 30,
            textAlign: 'center',
          }}>
          Register
        </Text>

        <Input
          placeholder={'Username'}
          onChangeText={(text: string) => this.setState({username: text})}
          value={this.state.username}
        />
        <Input
          secureTextEntry={true}
          style={{marginTop: 10}}
          placeholder={'Password'}
          onChangeText={(text: string) => this.setState({password: text})}
          value={this.state.password}
        />
        <Input
          secureTextEntry={true}
          style={{marginTop: 10}}
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
