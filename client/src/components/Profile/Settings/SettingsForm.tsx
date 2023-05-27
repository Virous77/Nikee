import React from "react";
import styles from "./Settings.module.scss";
import { indiaStates, usStates } from "../../../utils/states";
import States from "./States";
import { userDataType } from "./Settings";
import { useAuthContext } from "../../../store/authContext";

type SettingsFormType = {
  userData: userDataType;
  setUserData: React.Dispatch<React.SetStateAction<userDataType>>;
  isLoading: boolean;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdate: () => void;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const SettingsForm: React.FC<SettingsFormType> = ({
  userData,
  setUserData,
  isLoading,
  handleChange,
  handleUpdate,
  setShow,
}) => {
  const { UserData } = useAuthContext();
  const { email, state, city, country, pinCode } = userData;

  return (
    <div className={styles["settings-form"]}>
      <h2>Account Details</h2>
      <form onClick={(e) => e.preventDefault()}>
        <fieldset>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </fieldset>

        <div className={styles["flat-form"]}>
          <fieldset>
            <label>Password</label>
            <input type="text" value={"*************"} disabled={true} />
          </fieldset>

          <p onClick={() => setShow(true)}>Edit</p>
        </div>

        <fieldset>
          <label>Date of Birth</label>
          <input type="text" value={UserData?.birth} disabled={true} />
        </fieldset>

        <div style={{ marginTop: "15px" }}>
          <h3>Location</h3>

          <fieldset>
            <label>Country</label>
            <select
              value={country}
              name="country"
              onChange={(e) =>
                setUserData({ ...userData, country: e.target.value })
              }
            >
              <option value="india">India</option>
              <option value="america">America</option>
            </select>
          </fieldset>

          <States
            data={country === "india" ? indiaStates : usStates}
            value={state ? state : ""}
            name="State"
            onChange={(e: string) => setUserData({ ...userData, state: e })}
          />

          <fieldset>
            <label>City</label>
            <input
              type="text"
              name="city"
              value={city}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset>
            <label>Pin Code</label>
            <input
              type="text"
              name="pinCode"
              value={pinCode}
              onChange={handleChange}
            />
          </fieldset>

          <div>
            <button onClick={handleUpdate} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SettingsForm;
