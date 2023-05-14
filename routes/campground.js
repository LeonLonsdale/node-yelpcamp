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
import { isLoggedIn } from '../controllers/auth.js';

export const router = Router();

router
  .route('/')
  .get(showAllCampgrounds)
  .post(isLoggedIn, validateCampground, createCampground);

router.route('/new').get(isLoggedIn, renderNewCampgroundForm);

router
  .route('/:id')
  .get(showCampground)
  .put(isLoggedIn, validateCampground, updateCampground)
  .delete(isLoggedIn, deleteCampground);

router.route('/:id/edit').get(isLoggedIn, renderUpdateCampgroundForm);
