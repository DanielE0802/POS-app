import { sum, map, filter, uniqBy, reject, has } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../api/axios';
import RequestService from '../../api/services/service';

const initialState = {
  isLoading: false,
  error: false,
  warehouses: [],
  openPopup: false
};

const slice = createSlice({
  name: 'warehouses',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET WAREHOUSES

    getWarehouses(state, action) {
      state.isLoading = false;
      state.warehouses = action.payload;
    },

    switchPopupWarehouses(state) {
      state.openPopup = !state.openPopup;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions

export const { switchPopupWarehouses } = slice.actions;

export const getWarehouses = (r) => async (dispatch) => {
  try {
    dispatch(slice.actions.startLoading());
    const response = await RequestService.getPDV({ r });
    dispatch(slice.actions.getWarehouses(response.data));
  } catch (error) {
    dispatch(slice.actions.hasError(error));
  }
};
