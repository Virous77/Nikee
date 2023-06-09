import styles from "./Sneakers.module.scss";
import { useQuery } from "react-query";
import { useGlobalContext } from "../../store/GlobalContext";
import { getData } from "../../api/api";
import { useParams } from "react-router-dom";
import { Sneaker, AppError } from "../../interfaces/interface";
import SneakerDetails from "./SneakerDetails";
import MobileSneaker from "./MobileSneaker";
import Loader from "../UI/Loader";
import RelatedProduct from "../RelatedProduct/RelatedProduct";

const SingleSneaker = () => {
  const { name } = useParams();
  const { handleSetNotification } = useGlobalContext();

  const { data: sneaker, isLoading } = useQuery(
    [name],
    async () => {
      const data: Sneaker = await getData(`/sneaker/${name}`);
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
    <main className={styles["sneak-single"]}>
      <div className={styles["sneak-wrap"]}>
        <div className={styles["sneak-image"]}>
          <img src={sneaker?.heroImage} alt={sneaker?.name} />
          {sneaker?.images.map((img) => (
            <img src={img} alt={sneaker.name} key={img} />
          ))}
        </div>
        <MobileSneaker
          image={sneaker && [sneaker.heroImage, ...sneaker.images]}
        />
        <SneakerDetails sneaker={sneaker} />
      </div>
      <RelatedProduct
        endPoints={`/sneaker/related/brand/${sneaker?.brands || "nike"}`}
        title="Related Sneakers"
        link="sneaker"
        type={sneaker?.brands || "nike"}
      />
    </main>
  );
};

export default SingleSneaker;
