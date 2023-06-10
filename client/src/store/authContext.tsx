import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { AuthContextType, loginType } from "../types/type";
import { useMutation } from "react-query";
import { createData, loginUser, updateData } from "../api/api";
import { stateType } from "../types/type";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "./GlobalContext";
import { AppError } from "../interfaces/interface";
import { useQuery } from "react-query";
import { getData } from "../api/api";
import { getLocalData } from "../utils/data";
import { User } from "../interfaces/interface";
import { uploadImage } from "../utils/imageupload";
import useCart from "../hooks/useCart";

const stateInitialValue = {
  name: "",
  email: "",
  about: "",
  password: "",
  birth: "",
  gender: "",
  country: "india",
  image: "",
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
  userEditData: {} as User,
  setUserEditData: () => {},
  handleImageUpload: () => {},
  updateLoading: false,
  handleUserProfileUpdate: () => {},
  userLoading: false,
  updateMutate: () => {},
  refetch: () => {},
};

const AuthContext = createContext(initialValue);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [registerData, setRegisterData] = useState(stateInitialValue);
  const [validate, setValidate] = useState(false);
  const [userEditData, setUserEditData] = useState<User | undefined>(undefined);
  const { refetch: cartFetch } = useCart();

  const navigate = useNavigate();
  const { handleSetNotification } = useGlobalContext();
  const id = getLocalData("nike");

  //query
  const {
    data: UserData,
    refetch,
    isLoading: userLoading,
  } = useQuery(
    ["user"],
    async () => {
      if (id) {
        const data = await getData(`/user/${id}`);
        return data;
      }
    },
    {
      onError: (response: AppError) => {
        handleSetNotification({
          message: response.data.message,
          status: "error",
        });
      },
      retry: false,
    }
  );

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
      localStorage.setItem("offCartId", JSON.stringify(data._id));
      setRegisterData(stateInitialValue);
      refetch();
      setTimeout(() => {
        cartFetch();
      }, 1000);
    },
    onError: ({ data }: AppError) => {
      if (!data) return;
      handleSetNotification({ message: data?.message, status: "error" });
    },
  });

  const { mutate: updateMutate, isLoading: updateLoading } = useMutation({
    mutationFn: (data: any) => {
      return updateData({ userData: data, endpoints: `/user/${id}` });
    },
    onSuccess: ({ message }: { message: string }) => {
      handleSetNotification({ message, status: "success" });
      setUserEditData(undefined);
      refetch();
    },
    onError: ({ data }: AppError) => {
      if (!data) return;
      handleSetNotification({ message: data?.message, status: "error" });
    },
  });

  //input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const previewImage = URL.createObjectURL(e.target.files[0]);
    if (!userEditData) return;
    setUserEditData({ ...userEditData, image: previewImage });

    const uploadedImage = await uploadImage(e.target.files[0]);
    setUserEditData({ ...userEditData, image: uploadedImage });
  };

  const handleUserProfileUpdate = () => {
    if (!userEditData) return;
    updateMutate(userEditData);
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

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [id, refetch]);

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
        userEditData,
        setUserEditData,
        handleImageUpload,
        handleUserProfileUpdate,
        updateLoading,
        userLoading,
        updateMutate,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthContext;
