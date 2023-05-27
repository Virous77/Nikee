import React, { useState } from "react";
import styles from "./Settings.module.scss";
import { useGlobalContext } from "../../../store/GlobalContext";
import { useMutation } from "react-query";
import { updateData } from "../../../api/api";
import { getLocalData } from "../../../utils/data";
import { AppError } from "../../../interfaces/interface";

const ChangePassword = () => {
  const initialState = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };
  const [password, setPassword] = useState(initialState);

  const { confirmPassword, currentPassword, newPassword } = password;
  const { handleSetNotification } = useGlobalContext();
  const userId = getLocalData("nike");

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: any) => {
      return updateData({
        userData: data,
        endpoints: `/user/change-password/${userId}`,
      });
    },
    onSuccess: ({ message }: { message: string }) => {
      handleSetNotification({ message, status: "success" });
      setPassword(initialState);
    },
    onError: ({ data }: AppError) => {
      if (!data) return;
      handleSetNotification({ message: data?.message, status: "error" });
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  const handleChangePass = () => {
    if (!confirmPassword || !currentPassword || !newPassword)
      return handleSetNotification({
        message: "All fields must be filled",
        status: "error",
      });

    if (newPassword !== confirmPassword)
      return handleSetNotification({
        message: "New password don't match",
        status: "error",
      });

    mutate({ newPassword, password: currentPassword });
  };

  return (
    <section className={styles["changes-pass"]}>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="Current Password"
          name="currentPassword"
          value={currentPassword}
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="New Password"
          name="newPassword"
          value={newPassword}
          onChange={handleChange}
        />

        <input
          type="text"
          placeholder="Confirm Password"
          value={confirmPassword}
          name="confirmPassword"
          onChange={handleChange}
        />

        <button onClick={handleChangePass}>
          {isLoading ? "Processing..," : "Change Password"}
        </button>
      </form>
    </section>
  );
};

export default ChangePassword;
