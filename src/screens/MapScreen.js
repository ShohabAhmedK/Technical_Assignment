import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import MapViewComponent from '../components/MapView';
import PlaceCard from '../components/PlaceCard';
import { RootState } from '../store/store';

const MapScreen = () => {
  const { currentPlace } = useSelector((state: RootState) => state.places);

  return (
    <SafeAreaView style={styles.container}>
      <MapViewComponent place={currentPlace} />
      {currentPlace && (
        <View style={styles.cardContainer}>
          <PlaceCard place={currentPlace} />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
});

export default MapScreen;