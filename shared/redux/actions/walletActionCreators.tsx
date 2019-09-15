import {ACTION_TYPES} from '../constants/actionTypes';
import { SCREENS } from '../../../src/constants/screen';
import { Navigation } from 'react-native-navigation';
import tabbedNavigation from '../../../src/navigators/navigation';
import Decimal from 'decimal.js';

declare var window: any;

export const addBalance = (payload: any) => {
    return {
        type: ACTION_TYPES.WALLET.ADD_BALANCE,
        payload
    }
}

export const removeBalance = (payload: any) => {
    return {
        type: ACTION_TYPES.WALLET.REMOVE_BALANCE,
        payload
    }
}

export const setBalance = (payload: any) => {
    return {
        type: ACTION_TYPES.WALLET.SET_BALANCE,
        payload
    }
}

export const resetBalance = (payload: any) => {
    return {
        type: ACTION_TYPES.WALLET.RESET_BALANCE,
        payload
    }
}

export const claimAttempt = (payload: any) => {
    return {
        type: ACTION_TYPES.FAUCET.CLAIM_ATTEMPT,
        payload
    }
}

export const claimSuccess = (payload: any, componentId: string) => {
    return (dispatch: Function, getState: Function) => {
        const {txId, toAddress} = payload;
        Navigation.push(componentId, {
            component: {
                name: SCREENS.Auth.FaucetSuccess,
                passProps: {
                  txId: txId,
                  address: toAddress
                }
            }
        });

        const {userId} = getState().auth.currentUser;

        dispatch({
            type: ACTION_TYPES.FAUCET.CLAIM_SUCCESS,
            payload,
            userId
        });
    }
}

export const claimFail = (payload: any) => {
    return (dispatch: Function, getState: Function) => {
        const {userId} = getState().auth.currentUser;

        tabbedNavigation();

        dispatch({
            type: ACTION_TYPES.FAUCET.CLAIM_FAIL,
            payload,            
            userId
        })
    }
}

export const sendAttempt = (payload: any, componentId: string) => {
    return (dispatch: Function, getState: Function) => {
        const {from, to, amount} = payload;

        Navigation.pop(componentId);

        window.nknWallet.transferTo(to, amount)
            .then((x: any) => {
                console.log('transfer success ', x);
                const tx = {from, to, amount, date: new Date(), success: true };
                payload.tx = tx;
                dispatch(sendSuccess(payload));
            })
            .catch((x: any) => {
                console.log('transfer error ', x);
                const tx = {from, to, amount, date: new Date(), success: false };
                payload.tx = tx;
                dispatch(sendFail(payload));
            });

        dispatch({
            type: ACTION_TYPES.WALLET.SEND_ATTEMPT,
            payload
        });
    }
}

export const sendSuccess = (payload: any) => {
    return {
        type: ACTION_TYPES.WALLET.SEND_SUCCESS,
        payload
    }
}

export const sendFail = (payload: any) => {
    return {
        type: ACTION_TYPES.WALLET.SEND_FAIL,
        payload
    }
}

export const confirmTransaction =  (payload: any) => {
    return (dispatch: Function, getState: Function) => {
        const {userId, address} = getState().auth.currentUser;
        
        window.nknWallet.getBalance()
            .then((x: Decimal) => {
                const payload = {balance: x.toNumber(), address: address};
                dispatch(setBalance(payload));
            });

        dispatch({
            type: ACTION_TYPES.WALLET.TX_CONFIRM,
            payload,
            userId
        });
    }
}
