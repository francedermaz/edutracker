import { useState } from "react";
import Modal from "./Modal";
import styles from "../styles/AddRoomForm.module.css";

const AddRoomForm = ({ onSave, onCancel }) => {
  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [courseCode, setCourseCode] = useState("");

  const handleSave = () => {
    const newRoom = {
      name,
      teacher,
      courseCode
    };
    onSave(newRoom);
    setName("");
    setTeacher("");
    setCourseCode("");
  };

  return (
    <Modal onClose={onCancel}>
      <form className={styles.form}>
        <h2 className={styles.heading}>Add Room</h2>
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
          <label className={styles.label} htmlFor="courseCode">
            Course Code:
          </label>
          <input
            type="text"
            id="courseCode"
            value={courseCode}
            className={styles.input}
            onChange={(e) => setCourseCode(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="teacher">
            Teacher:
          </label>
          <input
            type="text"
            id="teacher"
            value={teacher}
            className={styles.input}
            onChange={(e) => setTeacher(e.target.value)}
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
  );
};

export default AddRoomForm;
