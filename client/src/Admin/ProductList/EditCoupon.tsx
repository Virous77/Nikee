import React, { useState } from "react";
import styles from "../Coupon/Coupon.module.scss";
import style from "./Style.module.scss";
import { Coupon, AppError } from "../../interfaces/interface";
import { useMutation } from "react-query";
import { updateData } from "../../api/api";
import { useGlobalContext } from "../../store/GlobalContext";
import { getLocalData } from "../../utils/data";

type EditCouponType = {
  data: Coupon;
  refetch: () => void;
  onClose: () => void;
};

type updateData = {
  coupon: string;
  validFrom: string;
  validTill: string;
  discountPercent: number;
};

type updateType = {
  id: string;
  updateData: updateData;
};

const EditCoupon: React.FC<EditCouponType> = ({ data, refetch, onClose }) => {
  const [couponData, setCouponData] = useState({
    coupon: data.coupon,
    validFrom: data.validFrom,
    validTill: data.validTill,
    discountPercent: data.discountPercent,
  });

  const { coupon, validFrom, validTill, discountPercent } = couponData;
  const { handleSetNotification } = useGlobalContext();
  const userId = getLocalData("nike");

  const { mutate: updateMutate, isLoading } = useMutation({
    mutationFn: (data: updateType) => {
      return updateData({
        endpoints: `/coupon/${data.id}/${userId}`,
        userData: data.updateData,
      });
    },
    onError: ({ data }: AppError) => {
      handleSetNotification({ message: data?.message, status: "error" });
    },
    onSuccess: ({ message }: { message: string }) => {
      handleSetNotification({ message, status: "success" });
      onClose();
      refetch();
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCouponData({ ...couponData, [name]: value });
  };

  const handleEditCoupon = () => {
    updateMutate({ id: data._id, updateData: couponData });
  };

  return (
    <main className={`${styles["coupon"]}  ${style["edit-coupon"]}`}>
      <div className={styles["coupon-wrap"]}>
        <fieldset>
          <input
            type="text"
            placeholder="Coupon name"
            name="coupon"
            value={coupon}
            onChange={handleChange}
          />
        </fieldset>

        <fieldset>
          <input
            type="text"
            placeholder="Discount percent"
            name="discountPercent"
            value={discountPercent}
            onChange={handleChange}
          />
        </fieldset>

        <div className={styles["flat-date"]}>
          <fieldset>
            <label>Active Coupon</label>
            <input
              type="date"
              placeholder="Active Date"
              name="validFrom"
              value={validFrom}
              onChange={handleChange}
            />
          </fieldset>

          <fieldset>
            <label>Expiry Coupon </label>
            <input
              type="date"
              placeholder="Expired Date"
              name="validTill"
              value={validTill}
              onChange={handleChange}
            />
          </fieldset>
        </div>

        <div className={styles["date-button"]}>
          <button onClick={handleEditCoupon} disabled={isLoading}>
            {isLoading ? "Adding.." : "Update Coupon"}
          </button>
        </div>
      </div>
    </main>
  );
};

export default EditCoupon;
