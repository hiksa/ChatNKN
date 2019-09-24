import * as React from 'react';
import {View, Image, SafeAreaView} from 'react-native';
import styles from './styles';

export interface Props {
  init: Function;
}

interface State {}

class Splash extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // setTimeout(() => this.props.init(), 1000);
    this.props.init();
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Image
            style={{marginTop: 100}}
            resizeMode="contain"
            source={require('../../assets/images/tadapp.png')}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default Splash;
