import styles from "./Home.module.scss";
import HeroImage from "./HeroImage";
import HomeType from "./HomeType";
import ShopAir from "./ShopAir";
import HomeIconic from "./HomeIconic";
import HomePopular from "./HomePopular";
import { useQuery } from "react-query";
import { getData } from "../../api/api";
import { useGlobalContext } from "../../store/GlobalContext";
import { AppError, Home } from "../../interfaces/interface";
import Loader from "../UI/Loader";

const Homes = () => {
  const { handleSetNotification } = useGlobalContext();

  const { data, isLoading } = useQuery(
    ["home"],
    async () => {
      const data: Home[] = await getData("/home");
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
    <main className={styles.home}>
      <div className={styles["home-wrap"]}>
        <HeroImage heroData={data?.[0]?.homeHero} />
        <HomeType homeData={data?.[0]?.nikeAhead} />
        <ShopAir heroData={data?.[0]?.nikeAir} />
      </div>
      <HomeIconic />
      <HomePopular />
    </main>
  );
};

export default Homes;
