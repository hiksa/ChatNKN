import {ACTION_TYPES} from '../constants/actionTypes';

export interface State {
  isLoading: boolean;
  activeChatId: string;
  chats: {
    [key: string]: any[];
  };
}

const initialState: State = {
  isLoading: false,
  activeChatId: '',
  chats: {},
};

export default (state = initialState, action: any): State => {
  switch (action.type) {
    case ACTION_TYPES.CHAT.MESSAGE_SEEN: {
      debugger;
      const {userId, chatId, messageId} = action.payload;
      let newState = {
        ...state,
        chats: {
          ...state.chats,
          [userId]: {
            ...state.chats[userId],
            [chatId]: [
              {
                ...state.chats[userId][chatId].find(x => x._id == messageId)[0],
                received: true,
              },
              state.chats[userId][chatId].filter(x => x._id != messageId),
            ],
          },
        },
      };

      return newState;
    }

    case ACTION_TYPES.CHAT.MARK_SEEN: {
      const user = action.payload.userId;
      const chat = action.payload.chatId;

      return {
        ...state,
        chats: {
          ...state.chats,
          [user]: {
            ...state.chats[user],
            [chat]: [
              ...state.chats[user][chat].map((x: any) => ({
                ...x,
                seen: true,
              })),
            ],
          },
        },
      };
    }

    case ACTION_TYPES.CHAT.MARK_RECEIVED: {
      const {chatId, userId} = action.payload;
      return {
        ...state,
        chats: {
          ...state.chats,
          [userId]: {
            ...state.chats[userId],
            [chatId]: [
              ...state.chats[userId][chatId].map((x: any) => ({
                ...x,
                received: true,
              })),
            ],
          },
        },
      };
    }

    case ACTION_TYPES.CHAT.MESSAGE_DELIVERED: {
      const {userId, chatId, message} = action.payload;
      let newState = {
        ...state,
        chats: {
          ...state.chats,
          [userId]: {
            ...state.chats[userId],
            [chatId]: [
              ...state.chats[userId][chatId].map((x: any) => ({
                ...x,
                sent: x._id == message._id ? true : x.sent,
              })),
            ],
          },
        },
      };

      return newState;
    }

    case ACTION_TYPES.CHAT.ADD_MESSAGE: {
      const {userId, chatId, message} = action.payload;
      const chatExists = state.chats[userId][chatId] != undefined;

      let newState = {
        ...state,
        chats: {
          ...state.chats,
          [userId]: {
            ...state.chats[userId],
            [chatId]: chatExists
              ? [{...message}, ...state.chats[userId][chatId]]
              : [{...message}],
          },
        },
      };

      return newState;
    }

    case ACTION_TYPES.AUTH.REGISTER_SUCCESS: {
      const {userId} = action.payload;

      return {
        ...state,
        chats: {
          ...state.chats,
          [userId]: {},
        },
      };
    }

    case ACTION_TYPES.CONTACTS.ADD_CONTACT_ATTEMPT: {
      const {userId, contact} = action.payload;
      return {
        ...state,
        chats: {
          ...state.chats,
          [userId]: {
            ...state.chats[userId],
            [contact.userId]: [],
          },
        },
      };
    }

    case ACTION_TYPES.CONTACTS.INVITATION_RECEIVED: {
      const {contactId} = action.payload;
      const user = action.payload.userId;

      return {
        ...state,
        chats: {
          ...state.chats,
          [user]: {
            ...state.chats[user],
            [contactId]: [],
          },
        },
      };
    }

    default:
      return state;
  }
};
