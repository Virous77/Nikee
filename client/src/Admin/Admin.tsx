import AdminContent from "./AdminContent";
import AdminMenu from "./AdminMenu";
import styles from "./Admin.module.scss";

const Admin = () => {
  return (
    <main className={styles["admin"]}>
      <AdminMenu />
      <AdminContent />
    </main>
  );
};

export default Admin;
