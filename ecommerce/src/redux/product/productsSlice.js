/* eslint-disable no-useless-catch */
// src/features/product/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (page) => {
    const response = await axios.get(`https://dummyjson.com/products?limit=28&skip=${(page - 1) * 28}`);
    console.log(response.data);
    return response.data;
  }
);
export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeaturedProducts',
  async () => {
    const response = await axios.get(`https://dummyjson.com/products`);
    
    console.log(response.data);
    // Sort the products by rating in descending order
    const sortedProducts = response.data.products.sort((a, b) => b.rating - a.rating);
    // Get the top 10 rated products
    const topRatedProducts = sortedProducts.slice(0, 8);
    return topRatedProducts;
  }
);

// export const fetchProducts = createAsyncThunk('product/fetchProducts', async () => {
//   try {
//     const response = await axios.get('https://dummyjson.com/products');
//     console.log(response.data);
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// });

export const fetchSingleProduct = createAsyncThunk(
  'product/fetchSingleProduct',
  async (productId) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${productId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchQueryProducts = createAsyncThunk(
  'products/fetchProductsByQuery',
  async (searchQuery) => {
    const response = await axios.get(`https://dummyjson.com/products/search?q=${searchQuery}`);
    // const data = await response.json();
    return response.data;
  }
);

export const fetchProductCategories = createAsyncThunk(
  'products/fetchProductCategories',
  async () => {
    const response = await fetch('https://dummyjson.com/products/categories');
    const data = await response.json();
    return data;
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (category) => {
    const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
    // const data = await response.json();
    return response.data;
  }
);

const initialState = {
  products: [], 
  searchResults: [],
  currentPage: 1,
  totalPages: 0,
  categories: [],
  singleProduct: null,
  status: 'idle', 
  error: null,
  sortBy: null,
  featuredProducts: [],
  featuredProductsStatus: 'idle',
  categoryProductsStatus: 'idle',
  searchStatus: 'idle',
  sortedProducts: [], // Sorted products based on the current sorting criteria
  showResults: false // New state for showing/hiding results
};
const productSlice = createSlice({
  name: 'product',
  initialState: initialState,
  reducers: {
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setSortedProducts(state, action) {
      state.sortedProducts = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    }, 
    setShowResults: (state, action) => {
      state.showResults = action.payload;
    }   
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.totalPages = Math.ceil(action.payload.total / 28); // Assuming 28 items per page
        localStorage.setItem('Products', JSON.stringify(state.products));
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.featuredProducts = action.payload;
        
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchSingleProduct.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.singleProduct = action.payload;
        // localStorage.setItem('Products', JSON.stringify(state.products));
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchQueryProducts.pending, (state) => {
        state.searchStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchQueryProducts.fulfilled, (state, action) => {
        state.searchStatus = 'succeeded';
        state.searchResults = action.payload;
      })
      .addCase(fetchQueryProducts.rejected, (state, action) => {
        state.searchStatus = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.categories = action.payload;
      })
      .addCase(fetchProductCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
        state.totalPages = Math.ceil(action.payload.total / 28); // Assuming 28 items per page
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSortBy, setSortedProducts , setCurrentPage, setTotalPages, setFeaturedProducts, setShowResults} = productSlice.actions;

export default productSlice.reducer;
