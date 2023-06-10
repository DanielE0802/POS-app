import { sum, map, filter, uniqBy, reject, get } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../api/axios';
import RequestService from '../../api/services/service';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  error: false,
  categories: [],
  openPopup: false,
  products: [],
  product: null,
  sortBy: null,
  filters: {
    gender: [],
    category: 'All',
    colors: [],
    priceRange: '',
    rating: ''
  },
  checkout: {
    activeStep: 0,
    cart: [],
    subtotal: 0,
    total: 0,
    discount: 0,
    shipping: 0,
    billing: null
  }
};

const slice = createSlice({
  name: 'categories',
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

    // GET PRODUCTS
    getCategories(state, action) {
      state.isLoading = false;
      state.categories = action.payload;
    },

    getProducts(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },

    // DELETE PRODUCT
    deleteProduct(state, action) {
      state.categories = reject(state.categories, { id: action.payload });
    },

    //  SORT & FILTER PRODUCTS
    sortByProducts(state, action) {
      state.sortBy = action.payload;
    },

    filterProducts(state, action) {
      state.filters.gender = action.payload.gender;
      state.filters.category = action.payload.category;
      state.filters.colors = action.payload.colors;
      state.filters.priceRange = action.payload.priceRange;
      state.filters.rating = action.payload.rating;
    },

    // CHECKOUT
    getCart(state, action) {
      const cart = action.payload;

      const subtotal = sum(cart.map((product) => product.price * product.quantity));
      const discount = cart.length === 0 ? 0 : state.checkout.discount;
      const shipping = cart.length === 0 ? 0 : state.checkout.shipping;
      const billing = cart.length === 0 ? null : state.checkout.billing;

      state.checkout.cart = cart;
      state.checkout.discount = discount;
      state.checkout.shipping = shipping;
      state.checkout.billing = billing;
      state.checkout.subtotal = subtotal;
      state.checkout.total = subtotal - discount;
    },

    deleteCart(state, action) {
      const updateCart = filter(state.checkout.cart, (item) => item.id !== action.payload);

      state.checkout.cart = updateCart;
    },

    resetCart(state) {
      state.checkout.activeStep = 0;
      state.checkout.cart = [];
      state.checkout.total = 0;
      state.checkout.subtotal = 0;
      state.checkout.discount = 0;
      state.checkout.shipping = 0;
      state.checkout.billing = null;
    },

    onBackStep(state) {
      state.checkout.activeStep -= 1;
    },

    onNextStep(state) {
      state.checkout.activeStep += 1;
    },

    onGotoStep(state, action) {
      const goToStep = action.payload;
      state.checkout.activeStep = goToStep;
    },

    increaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity + 1
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    decreaseQuantity(state, action) {
      const productId = action.payload;
      const updateCart = map(state.checkout.cart, (product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: product.quantity - 1
          };
        }
        return product;
      });

      state.checkout.cart = updateCart;
    },

    // POPUP

    switchPopupState(state) {
      state.openPopup = !state.openPopup;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const {
  getCart,
  resetCart,
  onGotoStep,
  onBackStep,
  onNextStep,
  deleteCart,
  deleteProduct,
  filterProducts,
  sortByProducts,
  increaseQuantity,
  decreaseQuantity,
  switchPopupState
} = slice.actions;

// ----------------------------------------------------------------------

export function getCategories() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await RequestService.getCategories();
      console.log(response.data);
      dispatch(slice.actions.getCategories(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createCategory(databody) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      await RequestService.createCategory(databody);
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function switchPopup() {
  return async (dispatch) => {
    dispatch(slice.actions.switchPopupState());
  };
}

// ----------------------------------------------------------------------

export function getProductsInCategory(name) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await RequestService.getProducts(name);
      dispatch(slice.actions.getProducts(response.data));
    } catch (error) {
      console.error(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
