import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import Navbar from "../../components/NavBar";
import { useEffect, useState } from "react";

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
        <meta name="description" content={room.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        <h1>{room.name}</h1>
        <p>{room.description}</p>
        <p>Students: {room.Students.length}</p>
      </main>
    </div>
  );
};

export default RoomDetailPage;
