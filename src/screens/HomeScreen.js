import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setCurrentPlace, saveHistory } from '../store/slices/placesSlice';
import PlaceSearch from '../components/PlaceSearch';
import HistoryList from '../components/HistoryList';
import { RootState } from '../store/store';

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { history } = useSelector((state: RootState) => state.places);

  const handlePlaceSelected = useCallback((place: Place) => {
    dispatch(setCurrentPlace(place));
    dispatch(saveHistory());
    navigation.navigate('Map');
  }, [dispatch, navigation]);

  const handleHistoryItemPress = useCallback((place: Place) => {
    dispatch(setCurrentPlace(place));
    navigation.navigate('Map');
  }, [dispatch, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <PlaceSearch onPlaceSelected={handlePlaceSelected} />
      </View>
      <HistoryList 
        history={history} 
        onSelect={handleHistoryItemPress} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
  },
});

export default HomeScreen;