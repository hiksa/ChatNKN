import {connect} from 'react-redux';
import Component from './Component';
import {setUsername} from '../../../shared/redux/actions/authActionCreators';
import {AppState} from '../../../shared/redux/reducers';
import {UserPayload} from '../../../shared/models/payloads';

const mapStateToProps = (state: AppState) => {
  const {username} = state.auth.currentUser;
  const takenUsernames = state.auth.savedUsers
    .filter((x: UserPayload) => x.username != username)
    .map((x: UserPayload) => x.username);
  return {
    username,
    takenUsernames,
  };
};

const mapDispatchToProps = (dispatch: Function, ownProps: any) => {
  return {
    setUsername: (payload: any) =>
      dispatch(setUsername(payload, ownProps.componentId)),
  };
};

const editUsernametContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

export default editUsernametContainer;
