import {ACTION_TYPES} from '../constants/actionTypes';
import {UserPayload} from '../../models/payloads';

export interface State {
  currentUser: UserPayload;
  savedUsers: Array<UserPayload>;
}

const initialState = {
  currentUser: {
    address: '',
    password: '',
    userId: '',
    username: '',
    walletJSON: '',
    avatarSource: null,
  },
  savedUsers: new Array<UserPayload>(),
};

export default (state: State = initialState, action: any): State => {
  switch (action.type) {
    case ACTION_TYPES.AUTH.REGISTER_SUCCESS: {
      return {
        currentUser: {...action.payload},
        savedUsers: [...state.savedUsers, {...action.payload}],
      };
    }

    case ACTION_TYPES.AUTH.LOGIN_SUCCESS: {
      const existingUser = state.savedUsers.find(
        (x: UserPayload) => x.userId == action.payload.userId,
      );
      const newState = existingUser
        ? {
            ...state,
            currentUser: {...existingUser},
          }
        : {
            currentUser: {...action.payload},
            savedUsers: [...state.savedUsers, {...action.payload}],
          };

      return newState;
    }

    case ACTION_TYPES.AUTH.LOGOUT: {
      return {
        ...state,
        currentUser: {...initialState.currentUser},
      };
    }

    case ACTION_TYPES.SETTINGS.SET_IMAGE: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          avatarSource: {
            ...action.payload,
          },
        },
      };
    }

    default:
      return state;
  }
};
