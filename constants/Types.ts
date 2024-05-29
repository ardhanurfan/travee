export interface User {
  id: string;
  email: string;
  fullname: string;
  phone_number: string;
  photo_url: string | null;
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
  owners: User;
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
}

export interface Event {
  id: string;
  name: string;
  type: string;
}

export interface ItineraryItem {
  id: number;
  name: string;
  type: string;
  imageUrl: string;
  date: Date;
}

export interface GroupedItinerary {
  date: string;
  itineraries: ItineraryItem[];
}
