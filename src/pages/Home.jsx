import React, { useEffect, useState } from "react";
import firestore from "../firebaseA";
import { collection, addDoc, getDocs } from "firebase/firestore";

function Home() {
  const [dataHome, setDataHome] = useState([]);

  // Pridanie nového dokumentu do kolekcie
  const addComment = async (comment) => {
    try {
      const docRef = await addDoc(collection(firestore, "comments"), comment);
      console.log("Dokument bol úspešne pridaný s ID:", docRef.id);
    } catch (error) {
      console.error("Chyba pri pridávaní dokumentu:", error);
    }
  };

  // Získanie všetkých dokumentov z kolekcie
  const getComments = async () => {
    try {
      const querySnapshot = await getDocs(collection(firestore, "comments"));
      querySnapshot.forEach((doc) => {
        console.log("Dokument:", doc.id, doc.data());
      });
    } catch (error) {
      console.error("Chyba pri získavaní dokumentov:", error);
    }
  };

  // Volanie funkcie na získanie komentárov
  useEffect(() => {
    getComments();
  }, []);

  return (
    <div>
      <h1>This is Home page</h1>
    </div>
  );
}

export default Home;
