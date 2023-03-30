import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "../components/NavBar";
import Link from "next/link";
import Modal from "../components/Modal";
import AddRoomForm from "../components/AddRoomForm";
import EditRoomForm from "../components/EditRoomForm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [rooms, setRooms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [editingRoom, setEditingRoom] = useState(null);

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

  const handleEditRoom = (room) => {
    setEditingRoom(room);
    setShowModalEdit(true);
  };

  const handleEditRoomSubmit = (room) => {
    const token = localStorage.getItem("token");
    axios
      .put(`http://localhost:3001/rooms/${editingRoom.id}`, room, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const updatedRooms = rooms.map((r) => {
          if (r.id === response.data.id) {
            return response.data;
          } else {
            return r;
          }
        });
        setRooms(updatedRooms);
        setEditingRoom(null);
        setShowModalEdit(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteRoom = (roomId) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`http://localhost:3001/rooms/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        const updatedRooms = rooms.filter((room) => room.id !== roomId);
        setRooms(updatedRooms);
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

      <button
        className={styles.add}
        onClick={() =>
          localStorage.getItem("token") ? setShowModal(true) : toast.error("You should log in first.")
        }
      >
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
                <th className={styles.center}>Actions</th>
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
                  <td className={styles.center}>
                    <div className={styles.actions}>
                      <img
                        src="/assets/edit.png"
                        alt="Edit"
                        className={styles.icon}
                        onClick={() =>
                          localStorage.getItem("token") ? (
                            handleEditRoom(room)
                          ) : (
                            toast.error("You should log in first.")
                          )
                        }
                      />
                      <img
                        src="/assets/delete.png"
                        alt="Delete"
                        className={styles.icon}
                        onClick={() =>
                          localStorage.getItem("token") ? (
                            handleDeleteRoom(room.id)
                          ) : (
                            toast.error("You should log in first.")
                          )
                        }
                      />
                    </div>
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

      {showModalEdit && (
        <EditRoomForm
          room={editingRoom}
          onSave={handleEditRoomSubmit}
          onCancel={() => {
            setShowModalEdit(false);
            setEditingRoom(null);
          }}
        />
      )}

      <ToastContainer />
    </div>
  );
}
