import { createContext, useState, useContext, ReactNode } from "react";
import { AuthContextType, loginType } from "../types/type";
import { useMutation } from "react-query";
import { createData, loginUser } from "../api/api";
import { stateType } from "../types/type";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./GlobalContext";
import { AppError } from "../interfaces/interface";
import { useQuery } from "react-query";
import { getData } from "../api/api";
import { getLocalData } from "../utils/data";
import { User } from "../interfaces/interface";

const stateInitialValue = {
  name: "",
  email: "",
  about: "",
  password: "",
  birth: "",
  gender: "",
  country: "india",
};

const initialValue: AuthContextType = {
  registerData: stateInitialValue,
  setRegisterData: () => {},
  handleChange: () => {},
  handleRegisterUser: () => {},
  isLoading: false,
  validate: false,
  setValidate: () => {},
  stateInitialValue: stateInitialValue,
  loginLoading: false,
  handleLogin: () => {},
};

const AuthContext = createContext(initialValue);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [registerData, setRegisterData] = useState(stateInitialValue);
  const [validate, setValidate] = useState(false);
  const navigate = useNavigate();
  const { handleSetNotification } = useGlobalContext();

  ////Mutation
  const { mutate, isLoading } = useMutation({
    mutationFn: (data: stateType) => {
      return createData({ userData: data, endpoints: "/user" });
    },
    onSuccess: () => {
      navigate("/login");
      setRegisterData(stateInitialValue);
    },
    onError: ({ data }: AppError) => {
      if (!data) return;
      handleSetNotification({ message: data?.message, status: "error" });
    },
  });

  const { mutate: loginMutate, isLoading: loginLoading } = useMutation({
    mutationFn: (data: loginType) => {
      return loginUser({ userData: data, endpoints: "/user/login" });
    },
    onSuccess: (data) => {
      navigate("/");
      localStorage.setItem("nike", JSON.stringify(data._id));
      setRegisterData(stateInitialValue);
      refetch();
    },
    onError: ({ data }: AppError) => {
      if (!data) return;
      handleSetNotification({ message: data?.message, status: "error" });
    },
  });

  //query
  const { data: UserData, refetch } = useQuery<User>(["user"], {
    queryFn: async (): Promise<User> => {
      const id = getLocalData("nike");
      if (id) {
        return await getData(`/user/${id}`);
      }
      throw new Error("User ID not found");
    },
  });

  //input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  //submission
  const handleRegisterUser = () => {
    const { name, email, about, password, birth, gender } = registerData;
    if (!name || !email || !about || !password || !birth || !gender) {
      return setValidate(true);
    }
    setValidate(false);
    mutate(registerData);
  };

  const handleLogin = () => {
    const { email, password } = registerData;
    if (!email || !password) {
      return setValidate(true);
    }

    const userData = {
      email,
      password,
    };

    setValidate(false);
    loginMutate(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        registerData,
        setRegisterData,
        handleChange,
        handleRegisterUser,
        isLoading,
        validate,
        setValidate,
        stateInitialValue,
        loginLoading,
        handleLogin,
        UserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthContext;
