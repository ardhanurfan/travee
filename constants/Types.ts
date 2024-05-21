export interface User {
  email: string;
  fullname: string;
  phone_number: string;
  photo_url: string | null;
  preferences: string[];
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

export interface Destination {
  country: string;
  id: string;
  name: string;
  photo_url: string;
}

export interface Event {
  id: string;
  name: string;
  type: string;
}
