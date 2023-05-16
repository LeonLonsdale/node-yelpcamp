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
// const upload = multer({ dest: 'uploads/' });
export const router = Router();

console.dir(storage.cloudinary.config);

router
  .route('/')
  .get(showAllCampgrounds)
  // .post(isLoggedIn, validateCampground, createCampground);
  // upload.array('image')
  .post(upload.array('image'), (req, res) => {
    console.log(req.body, req.files);
    res.send('Shit worked');
  });

router.route('/new').get(isLoggedIn, renderNewCampgroundForm);

router
  .route('/:id')
  .get(showCampground)
  .put(isLoggedIn, isAuthor, validateCampground, updateCampground)
  .delete(isLoggedIn, isAuthor, deleteCampground);

router.route('/:id/edit').get(isLoggedIn, isAuthor, renderUpdateCampgroundForm);
