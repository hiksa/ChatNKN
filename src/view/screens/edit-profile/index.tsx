import {connect} from 'react-redux';
import Component from './Component';
import {sendAttempt} from '../../../../shared/redux/actions/walletActionCreators';
import {getAddressFromPubKey} from '../../../../shared/misc/util';

const mapStateToProps = (state: any) => {
  const {username} = state.auth.currentUser;

  return {
    username,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    attemptSend: (payload: any, componentId: string) =>
      dispatch(sendAttempt(payload, componentId)),
  };
};

const walletContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

export default walletContainer;
