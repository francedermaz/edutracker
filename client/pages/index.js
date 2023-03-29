import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Navbar from "../components/NavBar";
import Link from "next/link";

export default function Home() {
  const [rooms, setRooms] = useState([]);

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

  return (
    <div className={styles.container}>
      <Head>
        <title>EduTracker</title>
        <meta name="description" content="EduTracker" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

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
                    {room.Students.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
