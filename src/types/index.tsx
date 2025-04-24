// src/types/Place.ts

export interface Location {
    lat: number;
    lng: number;
  }
  
  export interface Place {
    id: string;
    name: string;
    address: string;
    location: Location;
    timestamp?: number; // Optional timestamp for sorting history
  }
  
  // If you want to extend this with more Google Places details later:
  export interface PlaceDetails extends Place {
    phoneNumber?: string;
    website?: string;
    rating?: number;
    photos?: string[];
    openingHours?: {
      openNow: boolean;
      periods?: {
        open: { day: number; time: string };
        close: { day: number; time: string };
      }[];
    };
  }