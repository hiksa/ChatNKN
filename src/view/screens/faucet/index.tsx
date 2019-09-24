import {connect} from 'react-redux';
import Component from './Component';
import {
  claimAttempt,
  claimSuccess,
  claimFail,
} from '../../../shared/redux/actions/walletActionCreators';

const mapStateToProps = (state: any) => {
  return {
    address: state.auth.currentUser.address,
    userId: state.auth.currentUser.userId,
    faucetLoaded: state.app.faucetLoaded,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    attemptClaim: (payload: any) => dispatch(claimAttempt(payload)),
    claimSuccess: (payload: any, componentId: string, nextScreen: string) =>
      dispatch(claimSuccess(payload, componentId, nextScreen)),
    claimFail: (payload: any, componentId: string, nextScreen: string) =>
      dispatch(claimFail(payload, componentId, nextScreen)),
  };
};

const faucetContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

export default faucetContainer;
