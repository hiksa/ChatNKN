import {ACTION_TYPES} from '../constants/actionTypes';

export interface State {
  isLoading: boolean;
  faucetLoaded: boolean;
  lastReceivedBlock: number;
  lastAudittedBlock: number;
}

const initialState = {
  isLoading: false,
  faucetLoaded: false,
  lastReceivedBlock: 0,
  lastAudittedBlock: 0,
};

export default (state: State = initialState, action: any): State => {
  switch (action.type) {
    case ACTION_TYPES.SPLASH_LAUNCHED: {
      return {
        ...state,
      };
    }

    case ACTION_TYPES.FAUCET.LOADED: {
      return {
        ...state,
        faucetLoaded: true,
      };
    }

    // case ACTION_TYPES.LAST_BLOCK: {
    //   return {
    //     ...state,
    //     lastBlock: action.payload,
    //   };
    // }

    default:
      return state;
  }
};
