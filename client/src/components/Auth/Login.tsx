import styles from "./Auth.module.scss";
import AuthHead from "./AuthHead";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../store/authContext";

const Login = () => {
  const {
    handleChange,
    registerData,
    validate,
    setRegisterData,
    setValidate,
    stateInitialValue,
    loginLoading,
    handleLogin,
  } = useAuthContext();
  const { email, password } = registerData;

  return (
    <main className={styles["register"]}>
      <div className={styles["register-wrap"]}>
        <AuthHead title="YOUR ACCOUNT FOR EVERYTHING NIKE" />

        <section className={styles["register-form-main"]}>
          <form onSubmit={(e) => e.preventDefault()}>
            <fieldset>
              <input
                type="text"
                placeholder="Email address"
                value={email}
                name="email"
                onChange={handleChange}
              />
              {validate && email.trim().length <= 0 ? (
                <p>Please enter your email</p>
              ) : null}
            </fieldset>

            <fieldset>
              <input
                type="password"
                placeholder="Password"
                value={password}
                name="password"
                onChange={handleChange}
              />
              {validate && password.trim().length <= 0 ? (
                <p>Please enter password</p>
              ) : null}
            </fieldset>

            <button className={styles["submit-form"]} onClick={handleLogin}>
              {loginLoading ? "Processing" : "SIGN IN"}
            </button>

            <span className={styles["member"]}>
              Not a Member?{" "}
              <Link
                to={"/register"}
                onClick={() => {
                  setRegisterData(stateInitialValue);
                  setValidate(false);
                }}
              >
                Join Us.
              </Link>{" "}
            </span>
          </form>
        </section>
      </div>
    </main>
  );
};

export default Login;
