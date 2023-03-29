import { useState, useEffect } from "react";
import styles from "../styles/Login.module.css";
import axios from "axios";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/auth/login", {
        email,
        password,
      })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
        setError("");
        router.push("/");
      })
      .catch((error) => {
        console.log(error);
        setError("Invalid email or password.");
      });
  };

  return (
    <div className={styles.loginContainer}>
      <h1 className={styles.loginTitle}>Login</h1>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.inputLabel}>
            Email
          </label>
          <input
            type="email"
            id="email"
            className={styles.inputField}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.inputLabel}>
            Password
          </label>
          <input
            type="password"
            id="password"
            className={styles.inputField}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className={styles.submitBtn}>
          Submit
        </button>
        {error && <p className={styles.errorMsg}>{error}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
