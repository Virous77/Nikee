export type stateType = {
  name: string;
  email: string;
  about: string;
  password: string;
  birth: string;
  gender: string;
  country: string;
};

export type AuthContextType = {
  registerData: stateType;
  setRegisterData: React.Dispatch<React.SetStateAction<stateType>>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegisterUser: () => void;
  isLoading: boolean;
  validate: boolean;
  setValidate: React.Dispatch<React.SetStateAction<boolean>>;
  stateInitialValue: stateType;
  loginLoading: boolean;
  handleLogin: () => void;
};

export type loginType = {
  email: string;
  password: string;
};
