import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {store} from './src/store/store';
import { loadHistory } from './src/store/slices/placesSlice';
import HomeScreen from './src/screens/HomeScreen';
import MapScreen from './src/screens/MapScreen';



const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    store.dispatch(loadHistory());
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="Home" 
            component={HomeScreen} 
            options={{ title: 'Place Search' }}
          />
          <Stack.Screen 
            name="Map" 
            component={MapScreen} 
            options={{ title: 'Map View' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;