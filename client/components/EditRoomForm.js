import { useState } from "react";
import Modal from "../components/Modal";
import styles from "../styles/EditRoomForm.module.css";

const EditRoomForm = ({ room, onSave, onCancel }) => {
  const [name, setName] = useState(room.name);
  const [courseCode, setCourseCode] = useState(room.courseCode);
  const [teacher, setTeacher] = useState(room.teacher);

  const handleSave = () => {
    const updatedRoom = {
      id: room.id,
      name,
      courseCode,
      teacher,
    };
    onSave(updatedRoom);
  };

  return (
    <div className={styles.main}>
      <Modal onClose={onCancel}>
        <form className={styles.form}>
          <h2 className={styles.heading}>Edit Room</h2>
          <div className={styles.container}>
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
          </div>
          <div className={styles.actions}>
            <button
              className={styles.button}
              type="button"
              onClick={handleSave}
            >
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

export default EditRoomForm;
