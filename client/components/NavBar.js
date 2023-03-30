import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Dropdown from "../components/Dropdown";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <p className={styles.navLink}>Dashboard</p>
      </Link>
      {token ? (
        <img
          src="/assets/userIcon.png"
          alt="Log In"
          className={styles.icon}
          onClick={() => setShowModal(!showModal)}
        />
      ) : (
        <Link href="/login">
          <img
            src="/assets/userIcon.png"
            alt="Log In"
            className={styles.icon}
          />
        </Link>
      )}
      {showModal && <Dropdown handleLogout={handleLogout} />}
    </nav>
  );
};

export default Navbar;
