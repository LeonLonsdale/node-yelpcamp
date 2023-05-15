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
import { isLoggedIn, isAuthor } from '../controllers/auth.js';

export const router = Router();

router
  .route('/')
  .get(showAllCampgrounds)
  .post(isLoggedIn, validateCampground, createCampground);

router.route('/new').get(isLoggedIn, renderNewCampgroundForm);

router
  .route('/:id')
  .get(showCampground)
  .put(isLoggedIn, isAuthor, validateCampground, updateCampground)
  .delete(isLoggedIn, isAuthor, deleteCampground);

router.route('/:id/edit').get(isLoggedIn, isAuthor, renderUpdateCampgroundForm);
