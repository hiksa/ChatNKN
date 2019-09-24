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
        <Text category={'h5'} style={{textAlign: 'center'}}>
          Success
        </Text>
        <Text category={'p1'}>
          Transaction with id{' '}
          <Text style={{fontWeight: 'bold'}}>{this.props.txId}</Text> is on it's
          way to address{' '}
          <Text style={{fontWeight: 'bold'}}>{this.props.address}</Text>.
        </Text>

        <Button
          style={{textAlign: 'center', marginTop: 20}}
          onPress={this.handleContinue}>
          Continue
        </Button>
      </Layout>
    );
  }
}
