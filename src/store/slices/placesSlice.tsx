import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { storeData, getData } from '../utils/storage';
import { Place } from '../types';

interface PlacesState {
  history: Place[];
  currentPlace: Place | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: PlacesState = {
  history: [],
  currentPlace: null,
  isLoading: false,
  error: null,
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setCurrentPlace(state, action: PayloadAction<Place>) {
      state.currentPlace = action.payload;
    },
    addToHistory(state, action: PayloadAction<Place>) {
      // Avoid duplicates
      if (!state.history.some(place => place.id === action.payload.id)) {
        state.history = [action.payload, ...state.history];
      }
    },
    setHistory(state, action: PayloadAction<Place[]>) {
      state.history = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const {
  setCurrentPlace,
  addToHistory,
  setHistory,
  setLoading,
  setError,
} = placesSlice.actions;

export const loadHistory = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const history = await getData('placesHistory');
    if (history) {
      dispatch(setHistory(JSON.parse(history)));
    }
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const saveHistory = (): AppThunk => async (_, getState) => {
  try {
    const { history } = getState().places;
    await storeData('placesHistory', JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save history:', error);
  }
};

export default placesSlice.reducer;