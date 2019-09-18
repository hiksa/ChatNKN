import { connect } from 'react-redux';
import Component from './Component';
import { purgeStorage } from '../../../../shared/redux/actions/actionCreators';
import { claimAttempt, claimSuccess, claimFail } from '../../../../shared/redux/actions/walletActionCreators';

const mapStateToProps = (state: any) => {
    return {
        address: state.auth.currentUser.address,
        userId: state.auth.currentUser.userId,
        faucetLoaded: state.app.faucetLoaded
    }
};

const mapDispatchToProps = (dispatch: Function) => {
    return {
        purge: () => dispatch(purgeStorage()),
        attemptClaim: (payload: any) => dispatch(claimAttempt(payload)),
        claimSuccess: (payload: any, componentId: string) => dispatch(claimSuccess(payload, componentId)),
        claimFail: (payload: any) => dispatch(claimFail(payload)),
    }
};

const faucetContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export default faucetContainer;
