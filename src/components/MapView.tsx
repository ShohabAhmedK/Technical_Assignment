import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';
import { Place } from '../types';

interface MapViewProps {
  place: Place | null;
}

const MapViewComponent = ({ place }: MapViewProps) => {
  return (
    <MapView
      style={styles.map}
      region={{
        latitude: place?.location?.lat || 37.78825,
        longitude: place?.location?.lng || -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
    >
      {place && (
        <Marker
          coordinate={{
            latitude: place.location.lat,
            longitude: place.location.lng,
          }}
          title={place.name}
          description={place.address}
        />
      )}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapViewComponent;