import { Router } from 'express';
import passport from 'passport';
import { User } from '../models/user.js';
import {
  renderRegisterForm,
  createUser,
  renderLoginForm,
  login,
} from '../controllers/user.js';

export const router = Router();

router.route('/register').get(renderRegisterForm).post(createUser);
router
  .route('/login')
  .get(renderLoginForm)
  .post(
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/campgrounds',
    }),
    login
  );
