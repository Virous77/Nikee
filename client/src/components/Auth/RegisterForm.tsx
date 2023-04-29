import { useState } from "react";
import styles from "./Auth.module.scss";
import { useAuthContext } from "../../store/authContext";
import { BsCheck } from "react-icons/bs";
import { MdOutlineDateRange } from "react-icons/md";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [active, setActive] = useState(false);
  const {
    registerData,
    setRegisterData,
    handleChange,
    handleRegisterUser,
    isLoading,
    validate,
    stateInitialValue,
    setValidate,
  } = useAuthContext();

  const { name, email, password, about, birth, gender, country } = registerData;

  const female =
    gender === "female"
      ? `${styles["button"]} ${styles["active-button"]}`
      : styles["button"];

  const male =
    gender === "male"
      ? `${styles["button"]} ${styles["active-button"]}`
      : styles["button"];

  return (
    <section className={styles["register-form-main"]}>
      <form onSubmit={(e) => e.preventDefault()}>
        <fieldset>
          <input
            type="text"
            placeholder="Email address"
            value={email}
            onChange={handleChange}
            name="email"
          />
          {validate && email.trim().length === 0 ? (
            <p>Please enter a valid email</p>
          ) : null}
        </fieldset>

        <fieldset>
          <input
            type="text"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            name="password"
          />
          {validate && password.trim().length <= 4 ? (
            <p>Please enter password</p>
          ) : null}
        </fieldset>

        <fieldset>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={handleChange}
            name="name"
          />
          {validate && name.trim().length === 0 ? (
            <p>Please enter a name</p>
          ) : null}
        </fieldset>

        <fieldset>
          <input
            type="text"
            placeholder="About"
            value={about}
            onChange={handleChange}
            name="about"
          />
          {validate && about.trim().length === 0 ? (
            <p>Please write about you</p>
          ) : null}
        </fieldset>
        <fieldset>
          {active ? (
            <input
              type="date"
              value={birth}
              onChange={handleChange}
              name="birth"
              id="date"
            />
          ) : (
            <div className={styles["date-main"]}>
              <input
                type="text"
                id="date"
                placeholder="Date of Birth"
                onClick={() => setActive(true)}
              />
              <MdOutlineDateRange className={styles["date"]} />
            </div>
          )}
          {validate && birth.trim().length === 0 ? (
            <p>Please enter a valid date of birth</p>
          ) : null}
        </fieldset>

        <fieldset>
          <select
            value={country}
            onChange={(e) =>
              setRegisterData({
                ...registerData,
                country: e.target.value || "india",
              })
            }
          >
            <option value="india">India</option>
            <option value="america">America</option>
          </select>
        </fieldset>

        <div className={styles["gender"]}>
          <button
            onClick={() => setRegisterData({ ...registerData, gender: "male" })}
            className={male}
          >
            {gender === "male" && <BsCheck size={20} />} Male
          </button>
          <button
            onClick={() =>
              setRegisterData({ ...registerData, gender: "female" })
            }
            className={female}
          >
            {gender === "female" && <BsCheck size={20} />} Female
          </button>
        </div>
        {validate && name.trim().length === 0 ? (
          <p style={{ marginTop: "-7px" }}>Please select a preference.</p>
        ) : null}

        <button className={styles["submit-form"]} onClick={handleRegisterUser}>
          {isLoading ? "Processing" : "JOIN US"}
        </button>

        <span className={styles["member"]}>
          Already a Member?{" "}
          <Link
            onClick={() => {
              setRegisterData(stateInitialValue);
              setValidate(false);
            }}
            to={"/login"}
          >
            Sign In.
          </Link>{" "}
        </span>
      </form>
    </section>
  );
};

export default RegisterForm;
