import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Fetch books from API (using a product API for testing)
export const fetchBookName = createAsyncThunk(
  'books/fetchBookName',
  async () => {
    const response = await fetch("https://api.freeapi.app/api/v1/public/randomproducts?");
    const data = await response.json();
    return data.data.data; // This will be used as the payload
  }
);

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    products: [],
    loading: false,
    error: null,
    sortField: 'title', // Default sort field
    sortOrder: 'asc',   // Default sort order (ascending)
  },
  reducers: {
    sortBooks: (state, action) => {
      const { field, order } = action.payload;
      state.sortField = field;
      state.sortOrder = order;
      state.products.sort((a, b) => {
        const valA = a[field]?.toLowerCase() || '';
        const valB = b[field]?.toLowerCase() || '';
        if (order === 'asc') {
          return valA.localeCompare(valB);
        } else {
          return valB.localeCompare(valA);
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookName.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBookName.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchBookName.rejected, (state) => {
        state.error = 'Error fetching books';
        state.loading = false;
      });
  },
});

export const { sortBooks } = bookSlice.actions;
export default bookSlice.reducer;
