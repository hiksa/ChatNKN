import {ACTION_TYPES} from '../constants/actionTypes';

export interface State {
  isLoading: boolean;
  faucetLoaded: boolean;
}

const initialState = {
  isLoading: false,
  faucetLoaded: false,
};

export default (state: State = initialState, action: any): State => {
  switch (action.type) {
    case ACTION_TYPES.SPLASH_LAUNCHED:
      return {
        ...state,
      };

    case ACTION_TYPES.FAUCET.LOADED: {
      return {
        ...state,
        faucetLoaded: true,
      };
    }

    default:
      return state;
  }
};
