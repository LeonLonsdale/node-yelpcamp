import { reviewSchema } from '../JoiSchemas.js';
import { Review } from '../models/review.js';
import { Campground } from '../models/campground.js';
import { catchAsync } from '../utils/catchAsync.js';
import AppError from '../utils/AppError.js';

// Joi validation

export const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const message = error.details.map((element) => element.message).join(', ');
    throw new AppError(message, 400);
  }
  next();
};

export const createReview = catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  campground.reviews.push(review._id);
  review.author = req.user._id;
  await campground.save();
  await review.save();
  req.flash('success', 'Review added successfully');
  res.redirect(`/campgrounds/${campground._id}`);
});

export const deleteReview = catchAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, {
    $pull: { reviews: reviewId },
  });
  const review = await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Review deleted successfully');
  res.redirect(`/campgrounds/${id}`);
});
