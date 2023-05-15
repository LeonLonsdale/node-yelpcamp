import { Campground } from '../models/campground.js';
import { Review } from '../models/review.js';
import { catchAsync } from '../utils/catchAsync.js';

export const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    console.log('Session: ', req.session);
    console.log('Original URL :', req.originalUrl);
    req.flash('error', 'You are not logged in');
    return res.redirect('/login');
  }
  next();
};

export const isAuthor = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to do this');
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
});

export const isReviewAuthor = catchAsync(async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(req.user._id)) {
    req.flash('error', 'You do not have permission to do this');
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
});

export const storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) res.locals.returnTo = req.session.returnTo;
  console.log('Store ReturnTo: ', req.session.returnTo);
  console.log('Locals: ', res.locals);
  next();
};
