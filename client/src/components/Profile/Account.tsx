import styles from "./Profile.module.scss";
import { useAuthContext } from "../../store/authContext";
import logo from "../../assets/asset11.jpeg";
import { AiOutlineMail } from "react-icons/ai";
import { FaBirthdayCake } from "react-icons/fa";
import { SiKnowledgebase } from "react-icons/si";
import { BiWorld } from "react-icons/bi";
import { month } from "../../utils/data";
import EditProfile from "./EditProfile";
import { useState } from "react";
import { User } from "../../interfaces/interface";
import { Modal } from "../Modal/Modal";

const Account = () => {
  const { UserData } = useAuthContext();
  const [userEditData, setUserEditData] = useState<User | undefined>(undefined);

  const formatDate = (date: string | undefined) => {
    const splitDate = date?.split("-");
    if (!splitDate) return;
    return `${month[parseInt(splitDate[1]) - 1]} ${splitDate[2]} ${
      splitDate[0]
    }`;
  };

  return (
    <section className={styles.account}>
      <div className={styles["account-wrap"]}>
        <div className={styles["account-user"]}>
          <img src={UserData?.image || logo} alt={UserData?.name} />
          <p onClick={() => setUserEditData(UserData)}>Edit Profile</p>
        </div>

        <div className={styles["account-details"]}>
          <h2>Hi {UserData?.name.split(" ")[0]}</h2>
          <p>
            <AiOutlineMail /> {UserData?.email}
          </p>
          <p>
            <FaBirthdayCake /> {formatDate(UserData?.birth)}
          </p>
          <span style={{ marginTop: "1rem" }}>
            <SiKnowledgebase /> {UserData?.about}
          </span>
          <span>
            <BiWorld /> {UserData?.country}
          </span>
        </div>
      </div>

      {userEditData && (
        <Modal isOpen="isOpen" onClose={() => setUserEditData(undefined)}>
          <EditProfile onClose={() => setUserEditData(undefined)} />
        </Modal>
      )}
    </section>
  );
};

export default Account;
