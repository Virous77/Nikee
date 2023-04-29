import { createContext, useContext, useState, ReactNode } from "react";

type notificationType = {
  message: string;
  status: string;
};

type stateType = {
  show: boolean;
};

type GlobalType = {
  notification: notificationType;
  setNotification?: React.Dispatch<React.SetStateAction<notificationType>>;
  handleSetNotification: ({ message, status }: notificationType) => void;
  state: stateType;
  setState: React.Dispatch<React.SetStateAction<stateType>>;
};

const stateInitialValue = {
  message: "",
  status: "",
};

const stateInitialValueTwo = {
  show: false,
};

const initialValue: GlobalType = {
  notification: stateInitialValue,
  setNotification: () => {},
  handleSetNotification: () => {},
  state: stateInitialValueTwo,
  setState: () => {},
};

const GlobalContext = createContext<GlobalType>(initialValue);

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [notification, setNotification] =
    useState<notificationType>(stateInitialValue);
  const [state, setState] = useState(stateInitialValueTwo);

  const handleSetNotification = ({ message, status }: notificationType) => {
    setNotification({ ...notification, message, status });

    if (message) {
      document.querySelector(".notification")?.classList.add("active");
    }

    setTimeout(() => {
      document.querySelector(".notification")?.classList.remove("active");
      setNotification(stateInitialValue);
    }, 3000);
  };

  return (
    <GlobalContext.Provider
      value={{ notification, handleSetNotification, state, setState }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
export default GlobalContext;
