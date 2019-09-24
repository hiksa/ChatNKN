import {PURGE, REHYDRATE} from 'redux-persist';
import {ACTION_TYPES} from '../constants/actionTypes';
import {AppState} from '../reducers';

export const receiveBlock = (payload: string) => {
  return (dispatch: Function, getState: () => AppState) => {
    const blockNumber = parseInt(payload);
    const lastAuditedBlock = getState().app.lastAudittedBlock;

    dispatch({
      type: ACTION_TYPES.RECEIVE_BLOCK,
      payload: blockNumber,
    });
  };
};

export const auditBlock = (payload: any) => {
  return (dispatch: Function, getState: () => AppState) => {
    const blockNumber = parseInt(payload);

    dispatch({
      type: ACTION_TYPES.AUDIT_BLOCK,
      payload: blockNumber,
    });
  };
};

export const purgeStorage = () => {
  return {
    type: PURGE,
  };
};

export const rehydrateStore = () => {
  return {
    type: REHYDRATE,
    key: 'root',
  };
};

export const faucetLoaded = () => {
  return (dispatch: Function, getState: Function) => {
    dispatch({
      type: ACTION_TYPES.FAUCET.LOADED,
    });
  };
};
