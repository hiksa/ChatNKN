import {connect} from 'react-redux';
import Component from './Component';
import {register} from '../../../shared/redux/actions/authActionCreators';

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = (dispatch: Function, ownProps: any) => {
  return {
    register: (payload: any) => dispatch(register(payload, ownProps)),
  };
};

const registerContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

export default registerContainer;
