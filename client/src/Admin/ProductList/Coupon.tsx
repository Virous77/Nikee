import { useQuery, useMutation } from "react-query";
import { getData, deleteData } from "../../api/api";
import { useGlobalContext } from "../../store/GlobalContext";
import { Coupon, AppError } from "../../interfaces/interface";
import Loader from "../../components/UI/Loader";
import styles from "./Style.module.scss";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { dateFormate2 } from "../../utils/data";
import DeleteAlert from "../../common/DeleteAlert";
import { useState } from "react";
import { getLocalData } from "../../utils/data";
import ModalHeader from "../../components/Modal/ModalHeader";
import { Modal } from "../../components/Modal/Modal";
import EditCoupon from "./EditCoupon";

type stateType = {
  deleteCoupon: string | undefined;
  editCoupon: Coupon | undefined;
};

const Coupons = () => {
  const [showModal, setShowModal] = useState<stateType>({
    deleteCoupon: undefined,
    editCoupon: undefined,
  });
  const { handleSetNotification } = useGlobalContext();
  const userId = getLocalData("nike");

  const { data, isLoading, refetch } = useQuery(
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

  const { mutate: deleteMutate } = useMutation({
    mutationFn: (id: string) => {
      return deleteData(`/coupon/${id}/${userId}`);
    },
    onError: ({ data }: AppError) => {
      handleSetNotification({ message: data?.message, status: "error" });
    },
    onSuccess: ({ message }: { message: string }) => {
      setShowModal({ ...showModal, deleteCoupon: undefined });
      handleSetNotification({ message, status: "success" });
      refetch();
    },
  });

  const handleDelete = (id: string) => {
    deleteMutate(id);
  };

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
                <td>{dateFormate2(coupon.validFrom)}</td>
                <td>{dateFormate2(coupon.validTill)}</td>
                <td className={styles["edit-action"]}>
                  <button>
                    <TbEdit
                      onClick={() =>
                        setShowModal({ ...showModal, editCoupon: coupon })
                      }
                    />
                  </button>
                  <button>
                    <MdOutlineDeleteOutline
                      onClick={() =>
                        setShowModal({ ...showModal, deleteCoupon: coupon._id })
                      }
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal.deleteCoupon && (
        <DeleteAlert
          title="Coupon"
          id={showModal.deleteCoupon}
          onClick={handleDelete}
          onClose={() =>
            setShowModal({ ...showModal, deleteCoupon: undefined })
          }
        />
      )}

      {showModal.editCoupon && (
        <Modal
          isOpen="isOpen"
          onClose={() => setShowModal({ ...showModal, editCoupon: undefined })}
        >
          <ModalHeader
            name="Edit"
            onClose={() =>
              setShowModal({ ...showModal, editCoupon: undefined })
            }
          />
          <EditCoupon
            data={showModal.editCoupon}
            refetch={refetch}
            onClose={() =>
              setShowModal({ ...showModal, editCoupon: undefined })
            }
          />
        </Modal>
      )}
    </main>
  );
};

export default Coupons;
