import styles from "../styles/Dropdown.module.css";

const Dropdown = ({ handleLogout }) => {
  return (
    <div className={styles.dropdown}>
      <ul className={styles.list}>
        <li className={styles.item} onClick={handleLogout}>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default Dropdown;