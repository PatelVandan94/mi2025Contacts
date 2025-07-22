export interface NavigationType {
  [x: string]: any;
  navigation: any;
}

export interface LoginInputTypes {
  Email: string;
  Password: string;
}

export interface InputTypes {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthErrorType {
  error: Error;
}

export interface ResetEmailType {
  email: string;
}

export interface contactFields {
  firstName : string;
  lastName: string;
  phoneNumber: string;
  mobileNumber: string;
  homeNumber: string;
  workNumber: string;
}
