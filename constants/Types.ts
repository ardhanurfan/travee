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
