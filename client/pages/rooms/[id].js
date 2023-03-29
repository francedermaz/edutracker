import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import Navbar from "../../components/NavBar";
import { useEffect, useState } from "react";
import RoomTable from "../../components/RoomTable";
import styles from "../../styles/DetailsRoom.module.css";

const RoomDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [room, setRoom] = useState(null);

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

      <main className={styles.container}>
        <h1 className={styles.name}>{room.name}</h1>
        <p className={styles.teacher}>Teacher: {room.teacher}</p>
        <RoomTable students={room.Students} />
      </main>
    </div>
  );
};

export default RoomDetailPage;
