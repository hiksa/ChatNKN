import { ACTION_TYPES } from '../constants/actionTypes';

interface State {
    isLoading: boolean,
    contacts: {
        [key: string]: any[]
    }
}

const initialState: State = {
    isLoading: false,
    contacts: {

    }
};

export default (state: State = initialState, action: any) => {
  switch (action.type) {
    case ACTION_TYPES.CONTACTS.ADD_CONTACT_ATTEMPT: {
        const { userId } = action.payload;
        return {
            contacts: {
                ...state.contacts,
                [userId]: [
                    ...state.contacts[userId],
                    {
                        ...action.payload.contact,
                        isPending: true
                    }
                ]
            }
        }
    }

    case ACTION_TYPES.CONTACTS.ADD_CONTACT_SUCCESS: {
        const { userId, contactId } = action.payload;        
        const contact = state.contacts[userId].find((x: any) => x.id == contactId);
        return {
            contacts: {
                ...state.contacts,
                [userId]: [
                    ...state.contacts[userId].filter((x: any) => x.id != contactId),
                    {
                        ...contact,
                        isPending: false
                    }
                ]
            }
        }
    }

    case ACTION_TYPES.CONTACTS.REMOVE_CONTACT: {
        const { userId, contactId } = action.payload;
        return {
            contacts: {
                ...state.contacts,
                [userId]: [
                    ...state.contacts[userId].filter((x: any) => x.id != contactId)
                ]
            }
        }
    }

    case ACTION_TYPES.AUTH.REGISTER_SUCCESS: {
        const { userId } = action.payload;
        return {
            contacts: {
                ...state.contacts,
                [userId]: []
            }
        }
    }

    default:
      return state;
  }
};
