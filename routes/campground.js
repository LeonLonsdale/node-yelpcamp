import { Router } from 'express';
import {
  showAllCampgrounds,
  createCampground,
  deleteCampground,
  showCampground,
  updateCampground,
  validateCampground,
  renderNewCampgroundForm,
  renderUpdateCampgroundForm,
} from '../controllers/campground.js';

import {
  validateReview,
  createReview,
  deleteReview,
} from '../controllers/review.js';

export const router = Router();

router
  .route('/')
  .get(showAllCampgrounds)
  .post(validateCampground, createCampground);

router.route('/new').get(renderNewCampgroundForm);

router
  .route('/:id')
  .get(showCampground)
  .put(validateCampground, updateCampground)
  .delete(deleteCampground);

router.route('/:id/edit').get(renderUpdateCampgroundForm);

router.route('/:id/reviews').post(validateReview, createReview);

router.route('/:id/reviews/:reviewId').delete(deleteReview);
