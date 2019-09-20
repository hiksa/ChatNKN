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
            {
              ...action.payload.contact,
              isPending: true,
            },
            ...state.contacts[userId],
          ],
        },
      };
    }

    case ACTION_TYPES.CONTACTS.ADD_CONTACT_ATTEMPT_DELIVERED: {
      const {userId, contactId, deliveredOn} = action.payload;
      return {
        ...state,
        contacts: {
          ...state.contacts,
          [userId]: state.contacts[userId].map((x: any) =>
            x.userId == contactId
              ? {...x, isDelivered: true, deliveredOn}
              : {...x},
          ),
        },
      };
    }

    case ACTION_TYPES.CONTACTS.ADD_CONTACT_SUCCESS: {
      const {acceptedOn} = action.payload;
      const u = action.payload.userId;
      const contact = action.payload.contactId;
      return {
        ...state,
        contacts: {
          ...state.contacts,
          [u]: [
            ...state.contacts[u].map((x: any) =>
              x.userId == contact
                ? {...x, isPending: false, acceptedOn}
                : {...x},
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
        ...state,
        contacts: {
          ...state.contacts,
          [userId]: [],
        },
      };
    }

    case ACTION_TYPES.CONTACTS.INVITATION_RECEIVED: {
      const {username, requestReceivedOn} = action.payload;
      const c = action.payload.contactId;
      const user = action.payload.userId;

      debugger;
      return {
        ...state,
        contacts: {
          ...state.contacts,
          [user]: [
            {username, userId: c, isPending: true, requestReceivedOn},
            ...state.contacts[user],
          ],
        },
      };
    }

    case ACTION_TYPES.CONTACTS.ACCEPT_INVITATION: {
      const {contactId, acceptedOn} = action.payload;
      const user = action.payload.userId;

      return {
        ...state,
        contacts: {
          ...state.contacts,
          [user]: [
            ...state.contacts[user].map((x: any) =>
              x.userId == contactId
                ? {...x, isPending: false, acceptedOn}
                : {...x},
            ),
          ],
        },
      };
    }

    case ACTION_TYPES.CHAT.ADD_MESSAGE: {
      const {chatId, message, userId} = action.payload;
      const existingContact = state.contacts[userId].find(
        x => x.userId == chatId,
      );

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
