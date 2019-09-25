import {connect} from 'react-redux';
import Component from './Component';
import {setImage} from '../../../shared/redux/actions/authActionCreators';
import {getAddressFromPubKey} from '../../../shared/misc/util';

const mapStateToProps = (state: any) => {
  const {username, avatarSource} = state.auth.currentUser;

  return {
    username,
    avatarSource,
  };
};

const mapDispatchToProps = (dispatch: Function, ownProps: any) => {
  return {
    setImage: (payload: any) =>
      dispatch(setImage(payload, ownProps.componentId)),
  };
};

const walletContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

export default walletContainer;
