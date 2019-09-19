import {ACTION_TYPES} from '../constants/actionTypes';

export interface State {
  isLoading: boolean;
  contacts: {
    [key: string]: any[];
  };
}

const initialState: State = {
  isLoading: false,
  contacts: {},
};

export default (state: State = initialState, action: any): State => {
  switch (action.type) {
    case ACTION_TYPES.CONTACTS.ADD_CONTACT_ATTEMPT: {
      const {userId} = action.payload;
      return {
        ...state,
        contacts: {
          ...state.contacts,
          [userId]: [
            ...state.contacts[userId],
            {
              ...action.payload.contact,
              isPending: true,
            },
          ],
        },
      };
    }

    case ACTION_TYPES.CONTACTS.ADD_CONTACT_ATTEMPT_DELIVERED: {
      const {userId, contactId} = action.payload;
      return {
        ...state,
        contacts: {
          ...state.contacts,
          [userId]: state.contacts[userId].map((x: any) =>
            x.userId == contactId ? {...x, requestDelivered: true} : {...x},
          ),
        },
      };
    }

    case ACTION_TYPES.CONTACTS.ADD_CONTACT_SUCCESS: {
      const {userId, contactId} = action.payload;
      return {
        ...state,
        contacts: {
          ...state.contacts,
          [userId]: [
            ...state.contacts[userId].map((x: any) =>
              x.id == contactId ? {...x, isPending: false} : {...x},
            ),
          ],
        },
      };
    }

    case ACTION_TYPES.CONTACTS.REMOVE_CONTACT: {
      const {userId, contactId} = action.payload;
      return {
        contacts: {
          ...state.contacts,
          [userId]: [
            ...state.contacts[userId].filter((x: any) => x.id != contactId),
          ],
        },
      };
    }

    case ACTION_TYPES.AUTH.REGISTER_SUCCESS: {
      const {userId} = action.payload;
      return {
        contacts: {
          ...state.contacts,
          [userId]: [],
        },
      };
    }

    case ACTION_TYPES.CHAT.ADD_MESSAGE: {
      const {chatId, message, userId} = action.payload;
      const existingContact = state.contacts[userId]
        .find(x => x.userId == chatId);

      return {
        ...state,
        contacts: {
          ...state.contacts,
          [userId]: [
            {
              ...existingContact,
              lastMessageText: message.text,
              lastMessageSent: message.createdAt,
            },
            ...state.contacts[userId].filter((x: any) => x.userId != chatId),
          ],
        },
      };
    }

    default:
      return state;
  }
};
