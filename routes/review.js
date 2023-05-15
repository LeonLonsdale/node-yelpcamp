import { Router } from 'express';
import {
  validateReview,
  createReview,
  deleteReview,
} from '../controllers/review.js';
import { isLoggedIn } from '../controllers/auth.js';

export const router = Router({ mergeParams: true });

router.route('/').post(isLoggedIn, validateReview, createReview);

router.route('/:reviewId').delete(isLoggedIn, deleteReview);
