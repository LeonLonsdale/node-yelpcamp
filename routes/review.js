import { Router } from 'express';
import {
  validateReview,
  createReview,
  deleteReview,
} from '../controllers/review.js';

export const router = Router({ mergeParams: true });

router.route('/').post(validateReview, createReview);

router.route('/:reviewId').delete(deleteReview);
