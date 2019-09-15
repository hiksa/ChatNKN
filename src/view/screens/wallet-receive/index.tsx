import { connect } from 'react-redux';
import Component from './Component';

const mapStateToProps = (state: any) => {  
  const {address} = state.wallet;
    return {
        address: address
    }
};

const mapDispatchToProps = (dispatch: any) => ({});

const walletReceiveContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export default walletReceiveContainer;
