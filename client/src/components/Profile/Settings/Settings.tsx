import styles from "./Settings.module.scss";
import SettingsForm from "./SettingsForm";
import { useAuthContext } from "../../../store/authContext";
import Loader from "../../UI/Loader";
import { useState } from "react";

export type userDataType = {
  email?: string;
  country?: string;
  state?: string;
  city?: string;
  pinCode?: string;
};

const Settings = () => {
  const { UserData, userLoading, updateLoading, updateMutate } =
    useAuthContext();
  const [userData, setUserData] = useState<userDataType>({
    email: UserData?.email,
    country: UserData?.country,
    state: UserData?.state || "",
    city: UserData?.city || "",
    pinCode: UserData?.pinCode || "",
  });
  const [password, setPassword] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUpdate = () => {
    const data = {
      name: UserData?.name,
      ...userData,
    };
    updateMutate(data);
  };

  if (userLoading) return <Loader />;

  return (
    <main className={styles.settings}>
      <SettingsForm
        userData={userData}
        handleChange={handleChange}
        setUserData={setUserData}
        isLoading={updateLoading}
        handleUpdate={handleUpdate}
      />
    </main>
  );
};

export default Settings;
