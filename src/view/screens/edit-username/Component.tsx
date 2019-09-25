import * as React from 'react';
import {View} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Layout, Text, Button, Input} from 'react-native-ui-kitten';

export interface Props {
  username: string;
  componentId: string;
  setUsername: Function;
  takenUsernames: string[];
}

interface State {
  username: string;
  caption: string;
  status: string;
}

export default class EditUsername extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      username: props.username,
      caption: '',
      status: '',
    };
  }

  componentDidMount() {}

  handleEdit = () => {
    this.props.setUsername(this.state.username);
  };

  handleCancel = () => Navigation.pop(this.props.componentId);

  getCaption = (text: string) => {
    if (!text || !text.length) {
      return '';
    }

    if (this.props.takenUsernames.some(x => x == text)) {
      return 'Username already taken.';
    }

    return '';
  };

  getStatus = (text: string) => {
    if (!text || !text.length) {
      return '';
    }

    if (this.props.takenUsernames.some(x => x == text)) {
      return 'danger.';
    }

    return 'primary';
  };

  get disabledStatus() {
    const value = this.state.username;
    if (!value || !value.length) {
      return true;
    }

    if (
      this.props.takenUsernames.some(x => x == value) ||
      value == this.props.username
    ) {
      return true;
    }

    return false;
  }

  handleChangeText = (text: string) => {
    this.setState({
      username: text,
      caption: this.getCaption(text),
      status: this.getStatus(text),
    });
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
          Change Username
        </Text>

        <Input
          size={'small'}
          placeholder={'Username'}
          onChangeText={this.handleChangeText}
          value={this.state.username}
          caption={this.state.caption}
          status={this.state.status}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
            marginBottom: 20,
            justifyContent: 'space-around',
          }}>
          <Button
            style={{textAlign: 'center'}}
            onPress={this.handleEdit}
            disabled={this.disabledStatus}>
            Save
          </Button>

          <Button
            appearance={'outline'}
            style={{textAlign: 'center'}}
            onPress={this.handleCancel}>
            Cancel
          </Button>
        </View>
      </Layout>
    );
  }
}
