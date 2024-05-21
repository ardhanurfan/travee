import { firestore } from "@/config/firebase";
import { Destination } from "@/constants/Types";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export function GetDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "destinations"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDestinations(data as Destination[]);
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

  return { destinations, loading, error };
}

export function GetDestinationById(id: string) {
  const [destination, setDestination] = useState<Destination>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(firestore, `destinations/${id}`),
      (doc) => {
        const data = { id: id, ...doc.data() };
        setDestination(data as Destination);
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

  return { destination, loading, error };
}
