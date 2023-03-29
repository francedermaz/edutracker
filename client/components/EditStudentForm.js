import { useState } from "react";
import Modal from "../components/Modal";
import styles from "../styles/EditStudentForm.module.css";

const EditStudentForm = ({ student, onSave, onCancel }) => {
  const [name, setName] = useState(student.name);
  const [age, setAge] = useState(student.age);
  const [gender, setGender] = useState(student.gender);
  const [hasSibling, setHasSibling] = useState(student.hasSibling);
  const [siblings, setSiblings] = useState(student.siblings);

  const handleSave = () => {
    const updatedStudent = {
      id: student.id,
      name,
      age,
      gender,
    };
    onSave(updatedStudent);
  };

  return (
    <div className={styles.main}>
      <Modal onClose={onCancel}>
        <form className={styles.form}>
          <h2 className={styles.heading}>Edit Student</h2>
          <div className={styles.container}>
            <div className={styles.left}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  className={styles.input}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="age">
                  Age:
                </label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  className={styles.input}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
            </div>
            <div className={styles.right}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="gender">
                  Gender:
                </label>
                <select
                  id="gender"
                  value={gender}
                  className={styles.select}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="hasSibling">
                  Has Sibling: {hasSibling}
                </label>
              </div>
            </div>
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="siblings">
              Siblings:
            </label>
            <input
              type="text"
              id="siblings"
              value={siblings}
              className={styles.input}
              onChange={(e) => setSiblings(e.target.value)}
            />
          </div>
          <div className={styles.actions}>
            <button className={styles.button} type="button" onClick={handleSave}>
              Save
            </button>
            <button className={styles.buttonCancel} onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EditStudentForm;
