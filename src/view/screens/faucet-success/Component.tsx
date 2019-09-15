import * as React from 'react';
import {View, Image} from 'react-native';

import {Navigation} from 'react-native-navigation';
import {tabbedNavigation} from '../../../navigators/navigation';
import {Layout, Text, Button} from 'react-native-ui-kitten';

export interface Props {
  txId: string;
  address: string;
}

interface State {}

class FaucetSuccess extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
  }

  navigateToHome = () => {
    tabbedNavigation();
  };

  navigateToProfile = () => {};

  render() {
    return (
      <Layout style={{flex: 1, padding: 20}}>
        <Text category={'h4'}>Success</Text>
        <Text category={'p1'}>
          Transaction with id{' '}
          <Text style={{fontWeight: 'bold'}}>{this.props.txId}</Text> is on it's
          way to address{' '}
          <Text style={{fontWeight: 'bold'}}>{this.props.address}</Text>.
        </Text>

        <Button
          style={{textAlign: 'center', marginTop: 20}}
          onPress={this.navigateToHome}>
          Home
        </Button>
      </Layout>
    );
  }
}

export default FaucetSuccess;
