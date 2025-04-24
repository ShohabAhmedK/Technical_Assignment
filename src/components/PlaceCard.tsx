import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Place } from '../types';
// import Icon from 'react-native-vector-icons/MaterialIcons';

interface PlaceCardProps {
  place: Place;
  onPress?: () => void;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ place, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          {/* <Icon name="place" size={20} color="#4285F4" style={styles.icon} /> */}
          <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
            {place.name}
          </Text>
        </View>
        
        <Text style={styles.address} numberOfLines={2} ellipsizeMode="tail">
          {place.address}
        </Text>
        
        <View style={styles.coordinates}>
          <Text style={styles.coordinateText}>
            Lat: {place.location.lat.toFixed(6)}
          </Text>
          <Text style={styles.coordinateText}>
            Lng: {place.location.lng.toFixed(6)}
          </Text>
        </View>
      </View>
      
      {/* {onPress && (
        <Icon name="chevron-right" size={24} color="#666" style={styles.arrow} />
      )} */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 8,
    marginVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  icon: {
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  address: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  coordinates: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  coordinateText: {
    fontSize: 12,
    color: '#888',
    fontFamily: 'monospace',
  },
  arrow: {
    marginLeft: 8,
  },
});

export default PlaceCard;