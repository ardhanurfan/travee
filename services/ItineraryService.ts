import { firestore } from "@/config/firebase";
import { Event, Itinerary, ItineraryItem } from "@/constants/Types";
import { groupItineraryItemsByDate } from "@/utils/groupItineraryItemsByDate";
import {
  DocumentReference,
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export function GetItinerary(tripId: string) {
  const [itinerary, setItinerary] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, `trips/${tripId}/event`),
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

export const AddItinerary = async ({
  itineraryItems,
  tripId,
  destinationId,
}: {
  itineraryItems: ItineraryItem[];
  tripId: string;
  destinationId: string;
}) => {
  try {
    // Memperbarui dokumen trip dengan menambahkan referensi acara ke dalam sub-koleksi "events"
    await Promise.all(
      itineraryItems.map((item) =>
        setDoc(doc(firestore, `trips/${tripId}/event/${item.event.id}`), {
          event: doc(
            firestore,
            `destinations/${destinationId}/event/${item.event.id}`
          ),
          time_start: Timestamp.fromDate(item.time_start),
          time_finish: Timestamp.fromDate(item.time_finish),
        })
      )
    );
  } catch (err) {
    throw "Internal server error";
  }
};

export const RemoveItinerary = async ({
  itineraryItem,
  tripId,
}: {
  itineraryItem: ItineraryItem[];
  tripId: string;
}) => {
  try {
    // Membuat array referensi dokumen acara yang akan dihapus
    const itineraryRefs = itineraryItem.map((itemId) =>
      doc(firestore, `trips/${tripId}/event/${itemId}`)
    );

    // Menghapus dokumen acara dari sub-koleksi "events"
    await Promise.all(itineraryRefs.map((ref) => deleteDoc(ref)));
  } catch (err) {
    throw "Internal server error";
  }
};
