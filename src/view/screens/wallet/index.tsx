import {connect} from 'react-redux';
import Component from './Component';

const mapStateToProps = (state: any) => {
  const {username, userId} = state.auth.currentUser;
  const {balance, address} = state.wallet;
  const transactions = state.wallet.txHistory[userId].map((x: any) => ({
    ...x,
    isOutgoing: x.from == address,
  }));

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
