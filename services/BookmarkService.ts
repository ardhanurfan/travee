import { auth, firestore } from "@/config/firebase";
import { Destination } from "@/constants/Types";
import {
  collection,
  deleteDoc,
  doc,
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
      await setDoc(bookmarkRef, destination);
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
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
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
