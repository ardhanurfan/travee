export interface Destination {
  id: number;
  image: string;
  title: string;
  country: string;
}

export interface Trip {
  id: number;
  image: string;
  title: string;
  fasility: string;
}

export const enum MyTripsTypes {
  Upcoming = "Upcoming",
  Active = "Active",
  Passed = "Passed",
}

// export interface User {
//   email : string;
//   photoUrl : string;
//    : string;
// }
