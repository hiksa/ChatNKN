import {connect} from 'react-redux';
import Component from './Component';
import {loginAttempt} from '../../../shared/redux/actions/authActionCreators';
import {LoginAttemptPayload} from '../../../shared/models/payloads';

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: Function) => {
  return {
    login: (payload: LoginAttemptPayload) => dispatch(loginAttempt(payload)),
  };
};

const loginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

export default loginContainer;
