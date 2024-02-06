import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    RatingAndReview: JSON.parse(localStorage.getItem('RatingAndReview')) ?? [],
}

const ratingsAndReviewsSlice = createSlice({
  name: 'ratingsAndReviews',
  initialState: initialState,
  reducers: {
    addRatingAndReview: (state, action) => {
      const { id,user, rating, review } = action.payload;
      state.RatingAndReview.push({ id,user, rating, review });

      // Update local storage
      localStorage.setItem('RatingAndReview', JSON.stringify(state.RatingAndReview));
      console.log(JSON.parse(localStorage.getItem('RatingAndReview')));
    },
    // You can add more reducers for updating ratings and reviews if needed
  },
});

export const { addRatingAndReview } = ratingsAndReviewsSlice.actions;
export default ratingsAndReviewsSlice.reducer;
