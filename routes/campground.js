import multer from 'multer';
import { storage } from '../cloudinary/cloudinary.js';

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

const upload = multer({ storage });

export const router = Router();

router
  .route('/')
  .get(showAllCampgrounds)
  .post(
    isLoggedIn,
    upload.array('image', 5),
    validateCampground,
    createCampground
  );

router.route('/new').get(isLoggedIn, renderNewCampgroundForm);

router
  .route('/:id')
  .get(showCampground)
  .put(
    isLoggedIn,
    isAuthor,
    upload.array('image', 5),
    validateCampground,
    updateCampground
  )
  .delete(isLoggedIn, isAuthor, deleteCampground);

router.route('/:id/edit').get(isLoggedIn, isAuthor, renderUpdateCampgroundForm);
