


// src/utils/api.ts
import { Platform } from 'react-native';
import { Place, PlaceDetails } from '../types';

// Get API key from environment variables
const GOOGLE_API_KEY = "AIzaSyBA1CJG03TjIIaYeFRaWh3tbc6YBUNaVUk";

if (!GOOGLE_API_KEY) {
  throw new Error('Google API key is not defined in environment variables');
}

// Base API configuration
const BASE_URL = 'https://maps.googleapis.com/maps/api/place';
const API_TIMEOUT = 10000; // 10 seconds

interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  error?: string;
}

/**
 * Fetches place autocomplete predictions
 */
export const fetchAutocompletePredictions = async (
  query: string,
  sessionToken?: string
): Promise<ApiResponse<Place[]>> => {
  try {
    const url = `${BASE_URL}/autocomplete/json?input=${encodeURIComponent(
      query
    )}&key=${GOOGLE_API_KEY}&types=establishment${
      sessionToken ? `&sessiontoken=${sessionToken}` : ''
    }`;

    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(data.error_message || 'Unknown API error');
    }

    const places: Place[] = data.predictions.map((prediction: any) => ({
      id: prediction.place_id,
      name: prediction.structured_formatting.main_text,
      address: prediction.structured_formatting.secondary_text,
      location: { lat: 0, lng: 0 }, // Will be filled by fetchPlaceDetails
    }));

    return { data: places, status: 'success' };
  } catch (error) {
    return {
      data: [],
      status: 'error',
      error: error?.message || 'Failed to fetch predictions',
    };
  }
};

/**
 * Fetches detailed information about a specific place
 */
export const fetchPlaceDetails = async (
  placeId: string,
  sessionToken?: string
): Promise<ApiResponse<PlaceDetails>> => {
  try {
    const url = `${BASE_URL}/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}&fields=name,formatted_address,geometry${
      sessionToken ? `&sessiontoken=${sessionToken}` : ''
    }`;

    const response = await fetchWithTimeout(url);

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error(data.error_message || 'Unknown API error');
    }

    const result = data.result;
    const placeDetails: PlaceDetails = {
      id: placeId,
      name: result.name,
      address: result.formatted_address,
      location: {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
      },
      // Optional fields
      ...(result.rating && { rating: result.rating }),
      ...(result.formatted_phone_number && {
        phoneNumber: result.formatted_phone_number,
      }),
      ...(result.website && { website: result.website }),
    };

    return { data: placeDetails, status: 'success' };
  } catch (error) {
    return {
      data: {} as PlaceDetails,
      status: 'error',
      error: error?.message || 'Failed to fetch place details',
    };
  }
};

/**
 * Helper function for fetch with timeout
 */
const fetchWithTimeout = async (
  url: string,
  options: RequestInit = {},
  timeout = API_TIMEOUT
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw new Error(
      error?.name === 'AbortError' ? 'Request timed out' : error?.message
    );
  }
};

/**
 * Generates a new session token for billing purposes
 */
export const generateSessionToken = (): string => {
  return Array.from({ length: 32 }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
};

/**
 * Gets static map image URL for a place
 */
export const getStaticMapUrl = (
  location: { lat: number; lng: number },
  size: { width: number; height: number } = { width: 300, height: 200 },
  zoom: number = 14
): string => {
  return `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=${zoom}&size=${size.width}x${size.height}&markers=color:red%7C${location.lat},${location.lng}&key=${GOOGLE_API_KEY}`;
};

/**
 * Gets directions URL for native maps app
 */
export const getDirectionsUrl = (location: { lat: number; lng: number }) => {
  const { lat, lng } = location;
  if (Platform.OS === 'ios') {
    return `http://maps.apple.com/?daddr=${lat},${lng}&dirflg=d`;
  }
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&travelmode=driving`;
};