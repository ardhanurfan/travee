import { auth, firestore } from "@/config/firebase";
import { Destination } from "@/constants/Types";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export const toggleBookmarkDestination = async (destination: Destination) => {
  if (!auth.currentUser) {
    throw "User is not authenticated";
  }

  const userUid = auth.currentUser.uid;

  try {
    // Get the current user document
    const bookmarkDoc = await getDocs(
      collection(firestore, `users/${userUid}/bookmarks`)
    );

    const bookmarks = bookmarkDoc.docs.map((subDoc) => ({
      id: subDoc.id,
      ...subDoc.data(),
    }));

    // Check if the destination is already bookmarked
    const isBookmarked = bookmarks.find(
      (bookmark) => bookmark.id === destination.id
    );

    const bookmarkRef = doc(
      firestore,
      `users/${userUid}/bookmarks/${destination.id}`
    );

    if (isBookmarked) {
      await deleteDoc(bookmarkRef);
    } else {
      await setDoc(bookmarkRef, {destination: doc(firestore, `/destinations/${destination.id}`)});
    }
  } catch (error) {
    throw "Internal Server Error";
  }
};

export function GetSaved() {
  const [savedDestinations, setSavedDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, `users/${auth.currentUser?.uid}/bookmarks`),
      async (snapshot) => {
        const data = await Promise.all(snapshot.docs.map(async (doc) => {
          const ref = doc.data()["destination"];
          const docSnap = await getDoc(ref);
          return {
            id: doc.id,
            ...docSnap.data() 
          };
        }));
        setSavedDestinations(data as Destination[]);
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

  return { savedDestinations, loading, error };
}
