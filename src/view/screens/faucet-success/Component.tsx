import * as React from 'react';
import {tabbedNavigation} from '../../../navigators/navigation';
import {Layout, Text, Button} from 'react-native-ui-kitten';
import {Navigation} from 'react-native-navigation';
import {SCREENS} from '../../../constants/screen';

export interface Props {
  componentId: string;
  txId: string;
  address: string;
  nextScreen: string;
}

interface State {}

export default class FaucetSuccess extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
  }

  handleContinue = () => {
    const {nextScreen} = this.props;
    if (nextScreen == 'home') {
      tabbedNavigation();
    } else if (nextScreen == 'avatarSelect') {
      Navigation.push(this.props.componentId, {
        component: {
          name: SCREENS.Auth.AvatarSelect,
        },
      });
    } else {
      tabbedNavigation();
    }
  };

  render() {
    return (
      <Layout style={{flex: 1, padding: 20}}>
        <Layout level={'3'} style={{padding: 30}}>
          <Text
            category={'h4'}
            style={{textAlign: 'center', fontWeight: 'bold'}}>
            Claim Success
          </Text>
          <Text style={{textAlign: 'center', marginTop: 20}}>
            Your currency is on it's way!
          </Text>
          <Text
            category={'p2'}
            style={{textAlign: 'center', marginTop: 20, marginBottom: 10}}>
            Tx hash
          </Text>
          <Text
            category={'p2'}
            style={{textAlign: 'center', marginBottom: 40, fontWeight: 'bold'}}>
            {this.props.txId}
          </Text>
          <Button style={{textAlign: 'center'}} onPress={this.handleContinue}>
            Continue
          </Button>
        </Layout>
      </Layout>
    );
  }
}
