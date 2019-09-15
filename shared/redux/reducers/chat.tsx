import { ACTION_TYPES } from '../constants/actionTypes';

interface State {
  isLoading: boolean,
  activeChatId: string,
  chats: {
      [key: string]: any[]
  }
}

const initialState: State = {
  isLoading: false,
  activeChatId: '',
  chats: {

  }
};

export default (state = initialState, action: any) => {
  switch (action.type) {

    case ACTION_TYPES.CHAT.ADD_MESSAGE: {
      const { userId, chatId, message } = action.payload;
      const chatExists = state.chats[userId][chatId] != undefined;

      let newState = {
        ...state,
        chats: {
          ...state.chats,
          [userId]: {            
            ...state.chats[userId],
            [chatId]: chatExists 
              ? [ {...message}, ...state.chats[userId][chatId] ] 
              : [ {...message} ]
          }
        }
      };

      return newState;
    }

    case ACTION_TYPES.AUTH.REGISTER_SUCCESS: {
      const { userId } = action.payload;

      return {
        ...state,
        chats: {
          ...state.chats,
          [userId]: {

          }
        }
      }
    }

    case ACTION_TYPES.CONTACTS.ADD_CONTACT_ATTEMPT: {
        const { userId, contact } = action.payload;
        return {
            chats: {
              ...state.chats,
              [userId]: {
                ...state.chats[userId],
                [contact.userId]: [

                ]
              }
            }
        }
    }
    
    default:
      return state;
  }
};
