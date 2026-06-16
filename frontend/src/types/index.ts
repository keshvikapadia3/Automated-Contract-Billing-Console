export interface Contract {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
}

export interface Point {
  id: string;
  contractId: string;
  name: string;
  value: number;
}

export interface AuthState {
  isLoggedIn: boolean;
  username: string;
}

