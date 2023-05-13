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
