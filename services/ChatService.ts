import { auth, firestore } from "@/config/firebase";
import { Chat, Destination, Event } from "@/constants/Types";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export const GetRecommendation = async (userInput: string) => {
  try {
    // Post to Firebase
    const chatCollectionRef = collection(
      firestore,
      `/users/${auth.currentUser?.uid}/chats`
    ); // Ganti dengan koleksi yang valid
    await addDoc(chatCollectionRef, {
      time: Timestamp.fromDate(new Date()),
      message: userInput,
      isUser: true,
    });

    // Mengambil data destinasi dari Firestore
    const destinationsSnapshot = await getDocs(
      collection(firestore, "destinations")
    );
    const destinations = destinationsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Destination[];

    // Mengambil data acara dari sub-koleksi setiap destinasi
    let events: Event[] = [];
    for (const destination of destinations) {
      const eventsSnapshot = await getDocs(
        collection(firestore, `destinations/${destination.id}/event`)
      );
      const destinationEvents = eventsSnapshot.docs.map((eventDoc) => ({
        id: eventDoc.id,
        ...eventDoc.data(),
      })) as Event[];
      events = events.concat(destinationEvents);
    }

    if (destinations.length === 0 && events.length === 0) {
      return "Sorry, there are no destinations or events available.";
    }

    const destinationNames = destinations.map((dest) => dest.name).join(", ");
    const eventNames = events.map((event) => event.name).join(", ");

    // Membuat prompt untuk Google Generative AI
    const history = `You are a travel assistant. You can only recommend the following destinations: ${destinationNames}. You can also suggest the following events: ${eventNames}`;

    // Menggunakan Google Generative AI untuk menghasilkan konten
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: history }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    const result = await chat.sendMessage(userInput);
    const response = result.response;
    const text = response.text();

    // Post to Firebase
    await addDoc(chatCollectionRef, {
      time: Timestamp.fromDate(new Date()),
      message: text,
      isUser: false,
    });
  } catch (error) {
    console.error("Error:", error);
    return "Sorry, I couldn't process your request.";
  }
};

export function GetChats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, `users/${auth.currentUser?.uid}/chats`),
      async (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
            time: (doc.data()["time"] as Timestamp).toDate(),
          } as Chat;
        });

        setChats(
          (data as Chat[]).sort((a, b) => a.time.getTime() - b.time.getTime())
        );

        setLoading(false);
      },
      (error) => {
        console.error("Error fetching collection: ", error);
        setError(error);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { chats, loading, error };
}
