import * as React from 'react';
import {View, Image, SafeAreaView, StyleSheet} from 'react-native';

import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from '../../../../shared/redux/store';
import {Provider} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import QRCode from 'react-native-qrcode-svg';
import {CText} from '../../elements/custom';
import {Layout, Text} from 'react-native-ui-kitten';
// import ImagePicker from 'react-native-image-picker';

export interface Props {
  username: string;
  componentId: string;
  avatarSource: string;
}

interface State {
  avatarSource: string;
}

class EditProfile extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      avatarSource: '',
    };
  }

  componentDidMount() {
    const options = {
      title: 'Select Avatar',
      customButtons: [{name: 'fb', title: 'Choose Photo from Facebook'}],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    //   ImagePicker.showImagePicker(options, response => {
    //     console.log('Response = ', response);

    //     if (response.didCancel) {
    //       console.log('User cancelled image picker');
    //     } else if (response.error) {
    //       console.log('ImagePicker Error: ', response.error);
    //     } else if (response.customButton) {
    //       console.log('User tapped custom button: ', response.customButton);
    //     } else {
    //       const source = {uri: response.uri};
    //       console.log(response);
    //       console.log(source);
    //       // You can also display the image using data:
    //       // const source = { uri: 'data:image/jpeg;base64,' + response.data };

    //       this.setState({
    //         avatarSource: '',
    //       });
    //     }
    //   });
  }

  // handleCancel = () => {
  //   Navigation.pop(this.props.componentId);
  // };

  render() {
    return (
      <Layout style={[{flex: 1, padding: 20}, StyleSheet.absoluteFill]}>
        <Layout style={[{padding: 10}]} level={'3'}>
          <Image source={this.state.avatarSource} />
        </Layout>
      </Layout>
    );
  }
}

export default EditProfile;
