import styles from "./Auth.module.scss";
import AuthHead from "./AuthHead";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <main className={styles["register"]}>
      <div className={styles["register-wrap"]}>
        <AuthHead
          title="BECOME A NIKE MEMBER"
          desc="Create your Nike Member profile and get first access to the very best of Nike products, inspiration and community."
        />
        <RegisterForm />
      </div>
    </main>
  );
};

export default Register;
