import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "../components/NavBar";
import Link from "next/link";
import Modal from "../components/Modal";
import AddRoomForm from "../components/AddRoomForm";

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/rooms/")
      .then((response) => {
        setRooms(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddRoom = (room) => {
    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:3001/rooms", room, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const updatedRooms = [...rooms, response.data];
        setRooms(updatedRooms);
        setShowModal(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCancelAddRoom = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>EduTracker</title>
        <meta name="description" content="EduTracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <button className={styles.add} onClick={() => setShowModal(true)}>
        Add Room
      </button>

      <main className={styles.main}>
        <h3 className={styles.title}>Rooms</h3>
        <div className={styles.table_wrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.left}>Name</th>
                <th className={styles.center}>Students</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id} className={styles.room}>
                  <Link href={`/rooms/${room.id}`}>
                    <td className={`${styles.cell} ${styles.left}`}>
                      {room.name}
                    </td>
                  </Link>
                  <td className={`${styles.cell} ${styles.center}`}>
                    {room?.Students?.length ? room.Students.length : 0}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {showModal && (
        <Modal onClose={handleCancelAddRoom}>
          <AddRoomForm onSave={handleAddRoom} onCancel={handleCancelAddRoom} />
        </Modal>
      )}
    </div>
  );
}
