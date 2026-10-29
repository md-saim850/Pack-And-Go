import type { ObjectId } from "mongodb";

export interface TravelPackage {
  _id: string;
  title: string;
  location: string;
  category: string;
  price: number;
  duration: string;
  date: string;
  heroImage: string;
  overview: string;
  highlightsDescription: string;
  highlightsList: string[];
  perks: string[];
}

export interface BookingType {
  _id: string;
  data: TravelPackage;
}