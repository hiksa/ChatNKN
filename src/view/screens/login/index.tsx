import {connect} from 'react-redux';
import Component from './Component';
import {purgeStorage} from '../../../../shared/redux/actions/actionCreators';
import {loginAttempt} from '../../../../shared/redux/actions/authActionCreators';
import {LoginAttemptPayload} from '../../../../shared/models/payloads';

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: Function) => {
  return {
    login: (payload: LoginAttemptPayload) => dispatch(loginAttempt(payload)),
    purge: () => dispatch(purgeStorage()),
  };
};

const loginContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

export default loginContainer;
