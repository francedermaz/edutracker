import { useState } from "react";
import Modal from "../components/Modal";
import styles from "../styles/AddStudentForm.module.css";

const AddStudentForm = ({ onSave, onCancel }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male");
  const [hasSibling, setHasSibling] = useState(false);
  const [siblings, setSiblings] = useState("");
  const [siblingsList, setSiblingsList] = useState([]);

  const handleAddSibling = () => {
    if (siblings !== "") {
      setSiblingsList((prevList) => [...prevList, siblings]);
      setSiblings("");
    }
  };

  const handleRemoveSibling = (index) => {
    const newList = [...siblingsList];
    newList.splice(index, 1);
    setSiblingsList(newList);
  };

  const handleSave = () => {
    const newStudent = {
      name,
      age,
      gender,
      hasSibling: siblingsList.length ? true : false,
      siblings: siblingsList,
    };
    onSave(newStudent);
    setName("");
    setAge("");
    setGender("male");
    setHasSibling(false);
    setSiblings("");
    setSiblingsList([]);
  };

  return (
    <div className={styles.main}>
      <Modal onClose={onCancel}>
        <form className={styles.form}>
          <h2 className={styles.heading}>Add Student</h2>
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
            </div>
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
          <div className={styles.field}>
            <label className={styles.label} htmlFor="siblings">
              Siblings:
            </label>
            <div className={styles.siblingsInput}>
              <input
                type="text"
                id="siblings"
                value={siblings}
                className={styles.input}
                onChange={(e) => setSiblings(e.target.value)}
              />
              <button
                type="button"
                className={styles.addButton}
                onClick={handleAddSibling}
              >
                Add
              </button>
            </div>
            {siblingsList.length > 0 && (
              <ul className={styles.siblingsList}>
                {siblingsList.map((sibling, index) => (
                  <li key={index} className={styles.sibling}>
                    <p className={styles.siblingTitle}>{sibling}</p>
                    <p
                      className={styles.siblingX}
                      onClick={() => handleRemoveSibling(index)}
                    >
                      x
                    </p>
                  </li>
                ))}
              </ul>
            )}
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

export default AddStudentForm;
