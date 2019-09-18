export interface LoginAttemptPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
}

export interface UserPayload {
  address: string;
  password: string;
  userId: string;
  username: string;
  walletJSON: string;
}

export interface SetBalancePayload {
  balance: number;
  address: string;
}
