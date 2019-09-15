import { ACTION_TYPES } from '../constants/actionTypes';

const initialState = {
    currentUser: {},
    savedUsers: new Array<any>()
};

export default (state = initialState, action: any) => {
  switch (action.type) {

    case ACTION_TYPES.AUTH.REGISTER_SUCCESS:
        return {
            currentUser: {
                ...action.payload
            },
            savedUsers: [...state.savedUsers, { ...action.payload }]
        }

    case ACTION_TYPES.AUTH.LOGIN_SUCCESS: 
        const existingUser = state.savedUsers.find((x: any) => x.userId == action.payload.userId);        
        const newState = existingUser
            ? { 
                ...state, 
                currentUser: { ...existingUser } 
            }
            : { 
                currentUser: { ...action.payload }, 
                savedUsers: [...state.savedUsers, { ...action.payload }] 
            }
        
        return newState

    case ACTION_TYPES.AUTH.LOGOUT:
        return {
            ...state,
            currentUser: {}
        }

    default:
        return state;
  }
};
