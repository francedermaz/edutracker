import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import Navbar from "../../components/NavBar";
import { useEffect, useState } from "react";
import RoomTable from "../../components/RoomTable";
import AddStudentForm from "../../components/AddStudentForm";
import Modal from "../../components/Modal";
import styles from "../../styles/DetailsRoom.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RoomDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [room, setRoom] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3001/rooms/${id}`)
        .then((response) => {
          setRoom(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id]);

  const handleAddStudent = (student) => {
    const token = localStorage.getItem("token");
    student.roomId = router.query.id;
    axios
      .post("http://localhost:3001/students", student, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const updatedStudents = [...room.Students, response.data];
        const updatedRoom = { ...room, Students: updatedStudents };
        setRoom(updatedRoom);
        setShowModal(false);
        location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancelAddStudent = () => {
    setShowModal(false);
  };

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Head>
        <title>{room.name} - EduTracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <button
        className={styles.add}
        onClick={() =>
          localStorage.getItem("token")
            ? setShowModal(true)
            : toast.error("You should log in first.")
        }
      >
        Add Student
      </button>

      <main className={styles.container}>
        <h1 className={styles.name}>{room.name}</h1>
        <p className={styles.teacher}>Teacher: {room.teacher}</p>
        <RoomTable students={room.Students} />
      </main>

      {showModal && (
        <Modal onClose={handleCancelAddStudent}>
          <AddStudentForm
            onSave={handleAddStudent}
            onCancel={handleCancelAddStudent}
          />
        </Modal>
      )}
      <ToastContainer />
    </div>
  );
};

export default RoomDetailPage;
