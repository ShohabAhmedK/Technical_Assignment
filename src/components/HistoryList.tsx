import React from 'react';
import { FlatList, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Place } from '../types';

interface HistoryListProps {
  history: Place[];
  onSelect: (place: Place) => void;
}

const HistoryList = ({ history, onSelect }: HistoryListProps) => {
  return (
    <FlatList
      data={history}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity 
          style={styles.item} 
          onPress={() => onSelect(item)}
        >
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.address}>{item.address}</Text>
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  address: {
    fontSize: 14,
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#eee',
  },
});

export default HistoryList;