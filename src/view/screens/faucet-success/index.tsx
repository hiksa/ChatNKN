import {connect} from 'react-redux';
import Component from './Component';
import {loginAttempt} from '../../../shared/redux/actions/authActionCreators';

const mapStateToProps = (state: any) => {
  return {
    address: state.auth.currentUser.address,
    faucetLoaded: state.app.faucetLoaded,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    login: (payload: any) => dispatch(loginAttempt(payload)),
  };
};

const successFaucetContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

export default successFaucetContainer;
