import * as React from 'react';
import { View, Image, SafeAreaView } from 'react-native';
import styles from './styles';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '../../../../shared/redux/store';
import { Provider } from 'react-redux';

export interface Props {
  init: Function
}

interface State {}

class Splash extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
   // setTimeout(this.props.init, 1500);
    this.props.init();
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require('../../assets/images/rnn2.png')}
          />
          <Image
            resizeMode="center"
            source={require('../../assets/images/rn_ts.png')}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default Splash;
