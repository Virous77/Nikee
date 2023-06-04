import { useQuery } from "react-query";
import { getData } from "../../api/api";
import { useGlobalContext } from "../../store/GlobalContext";
import { Coupon, AppError } from "../../interfaces/interface";
import Loader from "../../components/UI/Loader";
import styles from "./Style.module.scss";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";

const Coupons = () => {
  const { handleSetNotification } = useGlobalContext();

  const { data, isLoading } = useQuery(
    ["admin-coupon"],
    async () => {
      const data: Coupon[] = await getData(`/coupon`);
      return data;
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

  if (isLoading) return <Loader />;

  return (
    <main className={styles["coupon-main"]}>
      <h2>Nike Coupons</h2>

      <div className={styles["coupon-list"]}>
        <table>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Discount</th>
              <th>Active</th>
              <th>Expiry</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((coupon, idx) => (
              <tr key={coupon._id}>
                <td>{idx + 1}</td>
                <td>{coupon.coupon}</td>
                <td>{coupon.discountPercent}% </td>
                <td>{coupon.validFrom}</td>
                <td>{coupon.validTill}</td>
                <td>
                  <TbEdit />
                  <MdOutlineDeleteOutline />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default Coupons;
