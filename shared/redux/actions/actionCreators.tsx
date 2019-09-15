import { PURGE, REHYDRATE } from 'redux-persist';
import { ACTION_TYPES } from '../constants/actionTypes';

export const purgeStorage = () => {
    return {
        type: PURGE
    }
}

export const rehydrateStore = () => {
    return {
        type: REHYDRATE,
        key: 'root'
    }
}

export const faucetLoaded = () => {
    return (dispatch: Function, getState: Function) => {        

        dispatch({
            type: ACTION_TYPES.FAUCET.LOADED
        });
    }     
}
