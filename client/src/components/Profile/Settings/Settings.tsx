import styles from "./Settings.module.scss";
import SettingsForm from "./SettingsForm";
import { useAuthContext } from "../../../store/authContext";
import Loader from "../../UI/Loader";
import { useState } from "react";
import { Modal } from "../../Modal/Modal";
import ChangePassword from "./ChangePassword";
import ModalHeader from "../../Modal/ModalHeader";

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
  const [showChangePass, setShowChangePass] = useState(false);

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
        setShow={setShowChangePass}
      />

      {showChangePass && (
        <Modal isOpen="isOpen" onClose={() => setShowChangePass(false)}>
          <ModalHeader
            name="Change Password"
            onClose={() => setShowChangePass(false)}
          />
          <ChangePassword />
        </Modal>
      )}
    </main>
  );
};

export default Settings;
