import { Double } from "react-native/Libraries/Types/CodegenTypes";

export interface User {
  id: string;
  email: string;
  fullname: string;
  phone_number: string;
  photo_url: string;
  preferences: string[];
}

export interface Trip {
  id: string;
  budget: string;
  count_people: string;
  destination: Destination;
  start_date: Date;
  end_date: Date;
  members: User[];
  owner: User;
  preferences: string[];
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
  description: string;
}

export interface Event {
  id: string;
  name: string;
  type: string;
  photo_url: string;
  longitude: Double;
  latitude: Double;
  price: string;
}

export interface ItineraryItem {
  event: Event;
  time_start: Date;
  time_finish: Date;
}

export interface Itinerary {
  date: string;
  items: ItineraryItem[];
}

export interface Chat {
  id: string;
  message: string;
  isUser: boolean;
  time: Date;
}
