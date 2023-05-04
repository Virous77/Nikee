import { getData } from "../../api/api";
import { useQuery } from "react-query";
import { useAuthContext } from "../../store/authContext";
import { UserAddress } from "../../interfaces/interface";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import styles from "./Profile.module.scss";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Address = () => {
  const { UserData } = useAuthContext();

  const { data: addressData } = useQuery(
    ["address"],
    (): Promise<UserAddress[]> => getData(`/address/${UserData?._id}`)
  );

  return (
    <section className={styles.address}>
      <div className={styles["address-list"]}>
        {addressData?.map((address) => (
          <div key={address._id} className={styles["address-card"]}>
            {address.addressType === "home" ? (
              <h4>
                <AiOutlineHome /> Home
              </h4>
            ) : (
              <h4>
                <HiOutlineOfficeBuilding /> Office
              </h4>
            )}

            <p>{address.address}</p>
            <p>{address.landmark}</p>

            <div className={styles["address-action-box"]}>
              <span>
                {address.city} {address.state} {address.postalCode}
              </span>

              <div className={styles["address-action"]}>
                <CiEdit cursor="pointer" />
                <MdOutlineDeleteOutline cursor="pointer" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Address;
