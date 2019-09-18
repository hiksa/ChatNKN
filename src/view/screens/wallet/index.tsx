import {connect} from 'react-redux';
import Component from './Component';
import {initiateApp} from '../../../../shared/redux/actions/authActionCreators';

const mapStateToProps = (state: any) => {
  const {username, userId} = state.auth.currentUser;
  const {balance, address} = state.wallet;
  const transactions = state.wallet.txHistory[userId]
    .filter((x: any) => x.txId)
    .map((x: any) => ({...x, isOutgoing: x.from == address}));

  return {
    username,
    balance,
    address,
    transactions,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  return {};
};

const walletContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Component);

export default walletContainer;
