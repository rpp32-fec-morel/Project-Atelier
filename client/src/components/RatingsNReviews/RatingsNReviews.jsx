import React from 'react';
import ReviewList from './ReviewList.jsx';
import NewReview from './NewReview.jsx';
const RatingsNReviews = ( {handleReviews, productId, currentProduct}) =>{
  return (
    <div className= "RatingsNReviewsSection">
      <ReviewList handleReviews={handleReviews} currentProduct={currentProduct} productId= {productId}/>
    </div>
  );
};

export default RatingsNReviews;