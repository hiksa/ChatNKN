import * as React from 'react';
import {
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  PixelRatio,
  TouchableOpacity,
} from 'react-native';

import {PersistGate} from 'redux-persist/integration/react';
import store, {persistor} from '../../../../shared/redux/store';
import {Provider} from 'react-redux';
import {Navigation} from 'react-native-navigation';
import QRCode from 'react-native-qrcode-svg';
import {CText} from '../../elements/custom';
import {Layout, Text, Button} from 'react-native-ui-kitten';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-root-toast';
// import {TouchableOpacity} from 'react-native-gesture-handler';

export interface Props {
  username: string;
  componentId: string;
  avatarSource: any;
  setImage: Function;
}

interface State {
  avatarSource: any;
  canSave: boolean;
}

export default class EditProfile extends React.PureComponent<Props, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      avatarSource: this.props.avatarSource,
      canSave: false,
    };
  }

  componentDidMount() {}

  handleSelectImage = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};
        this.setState({avatarSource: source, canSave: true});
      }
    });
  };

  handleSaveChanges = () => {
    this.props.setImage(this.state.avatarSource);
    Toast.show('Avatar updated.', {
      duration: Toast.durations.SHORT,
      position: Toast.positions.TOP,
    });

    this.setState({canSave: false});
  };

  handleCancel = () => {
    Navigation.pop(this.props.componentId);
  };

  render() {
    return (
      <Layout style={[{flex: 1, padding: 20}, StyleSheet.absoluteFill]}>
        <Layout style={[{padding: 10, alignItems: 'center'}]} level={'3'}>
          <TouchableOpacity
            onPress={this.handleSelectImage}
            style={{paddingBottom: 20}}>
            <View style={[styles.avatar, styles.avatarContainer]}>
              {this.state.avatarSource == null ? (
                <Text>Select a Photo</Text>
              ) : (
                <View>
                  <Image
                    style={styles.avatar}
                    source={this.state.avatarSource}
                  />
                </View>
              )}
            </View>
          </TouchableOpacity>
        </Layout>
        <View style={styles.buttonsContainer}>
          <Button
            onPress={this.handleSaveChanges}
            disabled={!this.state.canSave}>
            Save
          </Button>
          <Button onPress={this.handleCancel} appearance={'outline'}>
            Back
          </Button>
        </View>
      </Layout>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  avatarContainer: {
    borderColor: '#9B9B9B',
    borderWidth: 1 / PixelRatio.get(),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    borderRadius: 75,
    width: 150,
    height: 150,
  },
  buttonsContainer: {
    marginTop: 40,
    marginBottom: 40,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
});
