import styles from "../styles/RoomTable.module.css";

const RoomTable = ({ students }) => {
  return (
    <div className={styles.table_wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.left}>Name</th>
            <th className={styles.left}>Age</th>
            <th className={styles.center}>Gender</th>
            <th className={styles.center}>Has Siblings</th>
            <th className={styles.left}>Siblings Names</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className={styles.left}>{student.name}</td>
              <td className={styles.center}>{student.age}</td>
              <td className={styles.center}>{student.gender}</td>
              <td className={styles.center}>
                {student.hasSibling ? "Yes" : "No"}
              </td>
              <td className={styles.left}>
                {student.siblings
                  ? student.siblings.map((sibling) => sibling.name).join(", ")
                  : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomTable;
