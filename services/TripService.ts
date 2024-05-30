import { auth, firestore } from "@/config/firebase";
import { ItineraryItem, Trip, User } from "@/constants/Types";
import {
  DocumentReference,
  Timestamp,
  arrayRemove,
  arrayUnion,
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

export function GetTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "trips"),
      async (snapshot) => {
        const data = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const destinatonRef = doc.data()[
              "destination"
            ] as DocumentReference;
            const destinationSnap = await getDoc(destinatonRef);
            const destination = {
              id: destinationSnap.id,
              ...destinationSnap.data(),
            };

            const ownerRef = doc.data()["owner"] as DocumentReference;
            const ownerSnap = await getDoc(ownerRef);
            const owner = {
              id: ownerSnap.id,
              ...ownerSnap.data(),
            };

            const members = await Promise.all(
              doc.data()["members"].map(async (memberId: DocumentReference) => {
                const memberSnap = await getDoc(memberId);
                return { ...memberSnap.data(), id: memberSnap.id } as User;
              })
            );

            const trip = doc.data() as Trip;

            return {
              ...trip,
              id: doc.id,
              destination: destination,
              members: members,
              owner: owner,
              start_date: (doc.data()["start_date"] as Timestamp).toDate(),
              end_date: (doc.data()["end_date"] as Timestamp).toDate(),
            };
          })
        );

        const filteredById = data.filter((trip) =>
          trip.members.find((member) => member.id === auth.currentUser?.uid)
        ) as Trip[];
        setTrips(filteredById);
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

  return { trips, loading, error };
}

export function GetTripById(id: string) {
  const [trip, setTrip] = useState<Trip>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(firestore, `trips/${id}`),
      async (doc) => {
        const docData = doc.data();
        if (docData) {
          const destinationRef = docData["destination"] as DocumentReference;
          const destinationSnap = await getDoc(destinationRef);
          const destination = {
            id: destinationSnap.id,
            ...destinationSnap.data(),
          };

          const ownerRef = docData["owner"] as DocumentReference;
          const ownerSnap = await getDoc(ownerRef);
          const owner = {
            id: ownerSnap.id,
            ...ownerSnap.data(),
          };

          const members = await Promise.all(
            docData["members"].map(async (memberId: DocumentReference) => {
              const memberSnap = await getDoc(memberId);
              return { ...memberSnap.data(), id: memberSnap.id } as User;
            })
          );

          const trip = {
            ...docData,
            id: doc.id,
            destination: destination,
            members: members,
            owner: owner,
            start_date: (docData["start_date"] as Timestamp).toDate(),
            end_date: (docData["end_date"] as Timestamp).toDate(),
          } as Trip;

          setTrip(trip);
        }
      },
      (error) => {
        console.error("Error fetching collection: ", error);
        setError(error);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [id]);

  return { trip, loading, error };
}

export const AddPeople = async ({
  users,
  tripId,
}: {
  users: User[];
  tripId: string;
}) => {
  try {
    const tripRef = doc(firestore, `trips/${tripId}`);

    // Membuat array referensi dokumen pengguna yang akan ditambahkan
    const userRefs = users.map((user) => doc(firestore, `users/${user.id}`));

    // Memperbarui dokumen trip dengan menambahkan referensi pengguna ke dalam array "members"
    await updateDoc(tripRef, {
      members: arrayUnion(...userRefs),
    });
  } catch (err) {
    throw "Internal server error";
  }
};

export const RemovePeople = async ({
  userId,
  tripId,
}: {
  userId: string;
  tripId: string;
}) => {
  try {
    const tripRef = doc(firestore, `trips/${tripId}`);

    // Membuat array referensi dokumen pengguna yang akan dihapus
    const userRef = doc(firestore, `users/${userId}`);

    // Memperbarui dokumen trip dengan menghapus referensi pengguna dari array "members"
    await updateDoc(tripRef, {
      members: arrayRemove(userRef),
    });
  } catch (err) {
    throw "Internal server error";
  }
};

export function useAddTrip() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null | unknown>(null);

  const addTrip = async ({
    budget,
    count_people,
    destination,
    start_date,
    end_date,
    members,
    owners,
    preferences,
    events,
  }: {
    budget: string;
    count_people: string;
    destination: string;
    start_date: Date;
    end_date: Date;
    members: string[];
    owners: string |undefined;
    preferences: string[];
    events: ItineraryItem[];
  }) => {
    setLoading(true);
    try {
      // Add the trip to the 'trips' collection
      const tripRef = await addDoc(collection(firestore, "trips"), {
        budget: budget,
        count_people: count_people,
        destination: doc(firestore, `/destinations/${destination}`),
        start_date: Timestamp.fromDate(start_date),
        end_date: Timestamp.fromDate(end_date),
        members: members.map((user) => doc(firestore, `/users/${user}`)),
        owner: doc(firestore, `/users/${owners}`),
        preferences: preferences,
      });

      // Add events related to the trip
      for (const event of events) {
        await addDoc(collection(tripRef, "events"), {
          event: doc(firestore, `/destinations/${destination}/events/${event.event.id}`),
          time_start: Timestamp.fromDate(event.time_start),
          time_finish: Timestamp.fromDate(event.time_finish),
        });
      }

      setLoading(false);
    } catch (error) {
      console.error("Error adding trip: ", error);
      setError(error);
      setLoading(false);
    }
  };

  return { addTrip, loading, error };
}
