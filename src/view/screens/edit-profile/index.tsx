import {connect} from 'react-redux';
import Component from './Component';
import {setImage} from '../../../../shared/redux/actions/authActionCreators';
import {getAddressFromPubKey} from '../../../../shared/misc/util';

const mapStateToProps = (state: any) => {
  const {username, avatarSource} = state.auth.currentUser;

  return {
    username,
    avatarSource,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    setImage: (payload: any, componentId: string) =>
      dispatch(setImage(payload)),
  };
};

const walletContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

export default walletContainer;
