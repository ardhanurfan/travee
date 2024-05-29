const convertFirestoreTimestampToDate = (timestamp: {
  seconds: number;
  nanoseconds: number;
}): Date => {
  // Total milidetik dari detik dan nanodetik
  const totalMilliseconds =
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000;
  // Buat objek Date dari total milidetik
  return new Date(totalMilliseconds);
};
