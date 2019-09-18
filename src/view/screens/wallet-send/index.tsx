import {connect} from 'react-redux';
import Component from './Component';
import {sendAttempt} from '../../../../shared/redux/actions/walletActionCreators';
import {getAddressFromPubKey} from '../../../../shared/misc/util';

const mapStateToProps = (state: any) => {
  const {userId} = state.auth.currentUser;
  const {balance, address} = state.wallet;
  const contacts = state.contacts.contacts[userId].map((x: any) => {
    return {
      ...x,
      address: getAddressFromPubKey(x.userId),
    };
  });

  return {
    userId,
    balance,
    address,
    contacts,
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
