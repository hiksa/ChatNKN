import { ACTION_TYPES } from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  faucetLoaded: false
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.SPLASH_LAUNCHED:
      return {
        ...state,
      };

    case ACTION_TYPES.FAUCET.LOADED: {
      return {
        ...state,
        faucetLoaded: true
      };
    }
    
    default:
      return state;
  }
};
