import { auth, firestore } from "@/config/firebase";
import { Trip, User } from "@/constants/Types";
import {
  DocumentReference,
  Timestamp,
  collection,
  doc,
  getDoc,
  onSnapshot,
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
