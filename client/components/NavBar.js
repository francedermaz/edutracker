import Link from "next/link";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <p className={styles.navLink}>Dashboard</p>
      </Link>
      <Link href="/login">
        <img
          src="/assets/userIcon.png"
          alt="Log In"
          className={styles.icon}
        />
      </Link>
    </nav>
  );
};

export default Navbar;
