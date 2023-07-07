import { createSlice } from '@reduxjs/toolkit';
import RequestService from '../../api/services/service';

const initialState = {
  isLoading: false,
  error: false,
  brands: [],
  openPopup: false,
  edit: null,
  create: null
};

const slice = createSlice({
  name: 'brands',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    getBrands(state, action) {
      state.isLoading = false;
      state.brands = action.payload;
    },
    switchPopupBrands(state) {
      state.openPopup = !state.openPopup;
    },
    setEditBrand(state, action) {
      console.log('action.payload', action.payload);
      state.edit = action.payload;
      state.create = null;
    },
    setCreateBrand(state, action) {
      state.create = action.payload;
      state.edit = null;
    }
  }
});

// Reducer

export default slice.reducer;

// Actions

export const { switchPopupBrands, setEditBrand, setCreateBrand } = slice.actions;

// ----------------------------------------------------------------------

export function getBrands(r) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await RequestService.getBrands({ r });
      dispatch(slice.actions.getBrands(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
