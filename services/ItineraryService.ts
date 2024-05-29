import { firestore } from "@/config/firebase";
import { Event, Itinerary, ItineraryItem } from "@/constants/Types";
import { groupItineraryItemsByDate } from "@/utils/groupItineraryItemsByDate";
import {
  DocumentReference,
  Timestamp,
  collection,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export function GetItinerary(tripId: string) {
  const [itinerary, setItinerary] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, `trips/${tripId}/events`),
      async (snapshot) => {
        const data = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const eventRef = doc.data()["event"] as DocumentReference;
            const eventSnap = await getDoc(eventRef);
            const event = {
              id: eventSnap.id,
              ...eventSnap.data(),
            } as Event;

            return {
              id: doc.id,
              event: event,
              time_start: (doc.data()["time_start"] as Timestamp).toDate(),
              time_finish: (doc.data()["time_finish"] as Timestamp).toDate(),
            } as ItineraryItem;
          })
        );

        setItinerary(groupItineraryItemsByDate(data));
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

  return { itinerary, loading, error };
}
