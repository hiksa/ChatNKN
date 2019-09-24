import {connect} from 'react-redux';
import Component from './Component';
import {setImage} from '../../../shared/redux/actions/authActionCreators';

const mapStateToProps = (state: any) => {
  const {username, avatarSource} = state.auth.currentUser;

  return {
    username,
    avatarSource,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {
    setImage: (payload: any) => dispatch(setImage(payload)),
  };
};

const walletContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

export default walletContainer;
