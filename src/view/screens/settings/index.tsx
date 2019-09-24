import {connect} from 'react-redux';
import Component from './Component';
import {logout} from '../../../shared/redux/actions/authActionCreators';

const mapStateToProps = (state: any) => {
  const {userId} = state.auth.currentUser;
  return {
    userId,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    logout: () => dispatch(logout()),
  };
};

const settingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

export default settingsContainer;
