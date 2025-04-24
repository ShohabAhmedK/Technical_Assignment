import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch } from 'react-redux';
import { addToHistory } from '../store/slices/placesSlice';
import { GOOGLE_API_KEY } from '../utils/api';

const PlaceSearch = ({ onPlaceSelected }) => {
  const dispatch = useDispatch();

  return (
    <GooglePlacesAutocomplete
      placeholder="Search for places"
      minLength={2}
      autoFocus={false}
      returnKeyType={'search'}
      fetchDetails={true}
      onPress={(data, details = null) => {
        const place = {
          id: data.place_id,
          name: data.structured_formatting.main_text,
          address: data.structured_formatting.secondary_text,
          location: details?.geometry.location
        };
        dispatch(addToHistory(place));
        onPlaceSelected(place);
      }}
      query={{
        key: GOOGLE_API_KEY,
        language: 'en',
        types: '(regions)'
      }}
      styles={{
        textInputContainer: {
          backgroundColor: 'rgba(0,0,0,0)',
          borderTopWidth: 0,
          borderBottomWidth: 0
        },
        textInput: {
          marginLeft: 0,
          marginRight: 0,
          height: 38,
          color: '#5d5d5d',
          fontSize: 16
        },
        predefinedPlacesDescription: {
          color: '#1faadb'
        }
      }}
    />
  );
};

export default PlaceSearch;