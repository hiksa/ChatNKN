import * as React from 'react';
import {SafeAreaView, View} from 'react-native';
import {Layout, Text, Button} from 'react-native-ui-kitten';
import {Navigation} from 'react-native-navigation';
import {SCREENS} from '../../../constants/screen';

export interface Props {
  init: Function;
  username: string;
  componentId: string;
}

interface State {}

export default class RegisterSuccess extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  handleSkip = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: SCREENS.Auth.AvatarSelect,
      },
    });
  };

  handleClaim = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: SCREENS.Auth.Faucet,
        passProps: {
          nextScreen: 'avatarSelect',
        },
      },
    });
  };

  render() {
    return (
      <Layout style={{flex: 1, padding: 20}}>
        <Layout level={'3'} style={{padding: 30}}>
          <Text
            category={'h4'}
            style={{textAlign: 'center', fontWeight: 'bold'}}>
            Registration Success
          </Text>
          <Text style={{textAlign: 'center', marginTop: 30}}>
            Welcome, {this.props.username}!
          </Text>

          <Text
            category={'p2'}
            style={{textAlign: 'center', marginTop: 30, marginBottom: 40}}>
            Would you like to claim some free NKN crypto currency?
          </Text>

          <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <Button onPress={this.handleClaim}>Yes!</Button>
            <Button onPress={this.handleSkip} appearance={'outline'}>
              Skip
            </Button>
          </View>
        </Layout>
      </Layout>
    );
  }
}
