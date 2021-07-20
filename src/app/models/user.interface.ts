export interface IUserLoginData {
  name: string;
  password: string;
}

export interface IUserLoginResponse {
  valid: boolean;
  name: string;
  token: string;
}
