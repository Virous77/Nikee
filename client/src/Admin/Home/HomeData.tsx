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

const HomeData = () => {
  const [showCreate, setShowCreate] = useState(false);
  const { handleSetNotification } = useGlobalContext();

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

  if (isLoading) return <Loader />;

  return (
    <main className={styles.home}>
      <header>
        <h1>Home Data</h1>
        <button onClick={() => setShowCreate(true)}>Create</button>
      </header>

      {showCreate && (
        <Modal isOpen="isOpen" onClose={() => setShowCreate(false)}>
          <ModalHeader name="Create" onClose={() => setShowCreate(false)} />
          <CreateHomeData refetch={refetch} setShowCreate={setShowCreate} />
        </Modal>
      )}
    </main>
  );
};

export default HomeData;
