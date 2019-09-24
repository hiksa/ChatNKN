const ACTION_TYPES = {
  SPLASH_LAUNCHED: 'SPLASH_LAUNCHED',
  RECEIVE_BLOCK: 'RECEIVE_BLOCK',
  AUDIT_BLOCK: 'AUDIT_BLOCK',

  AUTH: {
    REGISTER_SUCCESS: 'auth/REGISTER_SUCCESS',
    REGISTER_FAIL: 'auth/REGISTER_FAIL',
    CLAIM_SUCCESS: 'auth/CLAIM_SUCCESS',
    CLAIM_FAIL: 'auth/CLAIM_FAIL',
    LOGIN_ATTEMPT: 'auth/LOGIN_ATTEMPT',
    LOGIN_SUCCESS: 'auth/LOGIN_SUCCESS',
    LOGIN_FAIL: 'auth/LOGIN_FAIL',
    LOGOUT: 'auth/LOGOUT',
  },

  CONTACTS: {
    ADD_CONTACT_ATTEMPT: 'contacts/ADD_CONTACT_ATTEMPT',
    ADD_CONTACT_ATTEMPT_DELIVERED: 'contacts/ADD_CONTACT_ATTEMPT_DELIVERED',
    ADD_CONTACT_DECLINED: 'contacts/ADD_CONTACT_DECLINED',
    ADD_CONTACT_FAIL: 'contacts/ADD_CONTACT_FAIL',
    ADD_CONTACT_ACCEPTED: 'contacts/ADD_CONTACT_ACCEPTED',
    ADD_CONTACT_SUCCESS: 'contacts/ADD_CONTACT_SUCCESS',
    REMOVE_CONTACT: 'contacts/REMOVE_CONTACT',
    INVITATION_RECEIVED: 'contacts/INVITATION_RECEIVED',
    ACCEPT_INVITATION: 'contacts/ACCEPT_INVITATION',
    DENY_INVITATION: 'contacts/DENY_INVITATION',
    CANCEL_INVITATION: 'contacts/CANCEL_INVITATION',
    UPDATE_IMAGE: 'contacts/UPDATE_IMAGE',
  },

  CHAT: {
    OPEN_CHAT: 'chat/OPEN_CHAT',
    ADD_MESSAGE: 'chat/ADD_MESSAGE',
    MESSAGE_DELIVERED: 'chat/MESSAGE_DELIVERED',
    MESSAGE_SEEN: 'chat/MESSAGE_READ',
    MARK_SEEN: 'chat/MARK_SEEN',
    MARK_RECEIVED: 'chat/MARK_RECEIVED',
  },

  WALLET: {
    SET_BALANCE: 'wallet/SET_BALANCE',
    ADD_BALANCE: 'wallet/ADD_BALANCE',
    REMOVE_BALANCE: 'wallet/REMOVE_BALANCE',
    RESET_BALANCE: 'wallet/RESET_BALANCE',
    SEND_ATTEMPT: 'wallet/SEND_ATTEMPT',
    SEND_SUCCESS: 'wallet/SEND_SUCCESS',
    SEND_FAIL: 'wallet/SEND_FAIL',
    RECEIVE: 'wallet/RECEIVE',
    TX_CONFIRM: 'wallet/TX_CONFIRM',
  },

  FAUCET: {
    LOADED: 'faucet/LOADED',
    CLAIM_ATTEMPT: 'faucet/CLAIM_ATTEMPT',
    CLAIM_FAIL: 'faucet/CLAIM_FAIL',
    CLAIM_SUCCESS: 'faucet/CLAIM_SUCCESS',
    CLAIM_CONFIRMED: 'faucet/CLAIM_CONFIRMED',
  },

  SETTINGS: {
    SET_IMAGE: 'settings/SET_IMAGE',
    SET_USERNAME: 'settings/SET_USERNAME',
  },
};

export {ACTION_TYPES};