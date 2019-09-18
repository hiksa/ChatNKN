import {ACTION_TYPES} from '../constants/actionTypes';

export interface State {
  balance: number;
  address: '';
  txHistory: {
    [key: string]: any[];
  };
  lastFaucetTxId: '';
}

const initialState: State = {
  balance: 0,
  address: '',
  txHistory: {},
  lastFaucetTxId: '',
};

export default (state: State = initialState, action: any): State => {
  switch (action.type) {
    case ACTION_TYPES.AUTH.REGISTER_SUCCESS: {
      const {userId} = action.payload;
      return {
        ...state,
        txHistory: {
          ...state.txHistory,
          [userId]: [],
        },
      };
    }

    case ACTION_TYPES.WALLET.SET_BALANCE:
      return {
        ...state,
        balance: action.payload.balance,
        address: action.payload.address,
      };

    case ACTION_TYPES.WALLET.ADD_BALANCE:
      return {
        ...state,
        balance: state.balance + action.payload,
      };

    case ACTION_TYPES.WALLET.REMOVE_BALANCE:
      return {
        ...state,
        balance: state.balance - action.payload,
      };

    case ACTION_TYPES.WALLET.RESET_BALANCE:
      return {
        ...state,
        balance: 0,
      };

    // case ACTION_TYPES.FAUCET.CLAIM_ATTEMPT: {
    //     const {userId} = action;
    //     return {
    //         ...state,
    //         txHistory: {
    //             ...state.txHistory,
    //             [userId]: [
    //                 ...state.txHistory[userId],
    //                 {...action.payload, confirmed: false, success: false}
    //             ]
    //         }
    //     }
    // }

    case ACTION_TYPES.FAUCET.CLAIM_FAIL:
    case ACTION_TYPES.FAUCET.CLAIM_SUCCESS: {
      const {userId} = action;
      return {
        ...state,
        txHistory: {
          ...state.txHistory,
          [userId]: [
            ...state.txHistory[userId],
            {...action.payload, confirmed: false},
          ],
        },
      };
    }

    case ACTION_TYPES.WALLET.TX_CONFIRM: {
      const {userId} = action;
      const {txId} = action.payload;

      const tx = state.txHistory[userId].find((x: any) => x.txId == txId);

      return {
        ...state,
        txHistory: {
          ...state.txHistory,
          [userId]: [
            ...state.txHistory[userId].filter((x: any) => x.txId != txId),
            {...tx, confirmed: true},
          ],
        },
      };
    }

    case ACTION_TYPES.WALLET.SEND_ATTEMPT:
      return {
        ...state,
      };

    case ACTION_TYPES.WALLET.SEND_SUCCESS: {
      const {userId} = action.payload;
      return {
        ...state,
        balance: state.balance - action.payload.amount,
        txHistory: {
          ...state.txHistory,
          [userId]: [...state.txHistory[userId], {...action.payload.tx}],
        },
      };
    }

    case ACTION_TYPES.WALLET.SEND_FAIL:
      return {
        ...state,
      };

    default:
      return state;
  }
};
