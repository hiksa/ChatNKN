import { connect } from 'react-redux';
import Component from './Component';
import { purgeStorage } from '../../../../shared/redux/actions/actionCreators';
import { loginAttempt } from '../../../../shared/redux/actions/authActionCreators';

const mapStateToProps = (state: any) => {
    return {
        address: state.auth.currentUser.address,
        faucetLoaded: state.app.faucetLoaded
    }
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        login: (payload: any) => dispatch(loginAttempt(payload)),
        purge: () => dispatch(purgeStorage())
    }
};

const successFaucetContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export default successFaucetContainer;
