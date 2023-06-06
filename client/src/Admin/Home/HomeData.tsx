import { useQuery } from "react-query";
import { getData } from "../../api/api";
import { useGlobalContext } from "../../store/GlobalContext";
import styles from "./Home.module.scss";
import { AppError, Home } from "../../interfaces/interface";
import CreateHomeData from "./CreateHomeData";
import { Modal } from "../../components/Modal/Modal";
import ModalHeader from "../../components/Modal/ModalHeader";
import { useState } from "react";
import Loader from "../../components/UI/Loader";
import DetailsModal from "./DetailsModal";

export type DetailsType = {
  name: string;
  data: {
    _id: string;
    image: string;
    title: string;
    description: string;
  };
  homeData: Home;
};

type HandleType = {
  homeData: Home;
  name: string;
};

const HomeData = () => {
  const [showCreate, setShowCreate] = useState(false);
  const { handleSetNotification } = useGlobalContext();
  const [details, setDetails] = useState<DetailsType | undefined>(undefined);

  const { data, isLoading, refetch } = useQuery(
    ["admin-home"],
    async () => {
      const data: Home[] = await getData(`/home`);
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

  const handleDetails = (data: HandleType) => {
    if (data.name === "homeHero") {
      setDetails({
        name: "Home Hero",
        homeData: data.homeData,
        data: { _id: data.homeData._id, ...data.homeData.homeHero },
      });
    }

    if (data.name === "menAhead") {
      setDetails({
        name: "Men",
        homeData: data.homeData,
        data: {
          _id: data.homeData._id,
          ...data.homeData.nikeAhead.men,
          description: "",
        },
      });
    }

    if (data.name === "womenAhead") {
      setDetails({
        name: "Women",
        homeData: data.homeData,
        data: {
          _id: data.homeData._id,
          ...data.homeData.nikeAhead.women,
          description: "",
        },
      });
    }

    if (data.name === "nikeAir") {
      setDetails({
        name: "Nike Air",
        homeData: data.homeData,
        data: {
          _id: data.homeData._id,
          ...data.homeData.nikeAir,
        },
      });
    }
  };

  if (isLoading) return <Loader />;

  return (
    <main className={styles.home}>
      <header>
        <h1>Home Data</h1>
        <button onClick={() => setShowCreate(true)}>Create</button>
      </header>

      <section className={styles["home-data"]}>
        <div className={styles["home-wrap"]}>
          {data?.map((home) => (
            <div key={home._id} className={styles["home-sub"]}>
              <div className={styles["home-flat"]}>
                <h2>Hero</h2>
                <img
                  src={home.homeHero.image}
                  alt={home.homeHero.title}
                  onClick={() =>
                    handleDetails({ name: "homeHero", homeData: home })
                  }
                />
              </div>

              <div className={styles[""]}>
                <h2>Nike Ahead</h2>

                <div className={styles["home-ahead-flat"]}>
                  <div className={styles["home-flat-s"]}>
                    <p>Men</p>
                    <img
                      src={home.nikeAhead.men.image}
                      alt={home.nikeAhead.men.title}
                      onClick={() =>
                        handleDetails({ name: "menAhead", homeData: home })
                      }
                    />
                  </div>

                  <div className={styles["home-flat-s"]}>
                    <p>Women</p>
                    <img
                      src={home.nikeAhead.women.image}
                      alt={home.nikeAhead.women.title}
                      onClick={() =>
                        handleDetails({ name: "womenAhead", homeData: home })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className={styles["home-flat"]}>
                <h2>Nike Air</h2>
                <img
                  src={home.nikeAir.image}
                  alt={home.nikeAir.title}
                  onClick={() =>
                    handleDetails({ name: "nikeAir", homeData: home })
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {showCreate && (
        <Modal isOpen="isOpen" onClose={() => setShowCreate(false)}>
          <ModalHeader name="Create" onClose={() => setShowCreate(false)} />
          <CreateHomeData refetch={refetch} setShowCreate={setShowCreate} />
        </Modal>
      )}

      {details?.name && (
        <Modal isOpen="isOpen" onClose={() => setDetails(undefined)}>
          <ModalHeader
            name={details.name}
            onClose={() => setDetails(undefined)}
          />
          <DetailsModal data={details} setDetails={setDetails} />
        </Modal>
      )}
    </main>
  );
};

export default HomeData;
