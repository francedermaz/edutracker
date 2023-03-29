import axios from "axios";
import { useState } from "react";
import styles from "../styles/RoomTable.module.css";

const RoomTable = ({ students }) => {
  const [studentsA, setStudentsA] = useState(students);
  const handleDeleteStudent = (studentId) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:3001/students/${studentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const updatedStudents = studentsA.filter(
          (student) => student.id !== studentId
        );
        setStudentsA(updatedStudents);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className={styles.table_wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.left}>Name</th>
            <th className={styles.center}>Age</th>
            <th className={styles.center}>Gender</th>
            <th className={styles.center}>Has Siblings</th>
            <th className={styles.center}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {studentsA.map((student) => (
            <tr key={student.id}>
              <td className={styles.left}>{student.name}</td>
              <td className={styles.center}>{student.age}</td>
              <td className={styles.center}>
                {student.gender.charAt(0).toUpperCase() +
                  student.gender.slice(1)}
              </td>
              <td className={styles.center}>
                {student.hasSibling ? "Yes" : "No"}
              </td>
              <td className={styles.center}>
                <div className={styles.actions}>
                  <img
                    src="/assets/edit.png"
                    alt="Edit"
                    className={styles.icon}
                  />
                  <img
                    src="/assets/delete.png"
                    alt="Delete"
                    className={styles.icon}
                    onClick={() => handleDeleteStudent(student.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoomTable;
