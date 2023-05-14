import { Router } from 'express';
import passport from 'passport';
import { User } from '../models/user.js';
import {
  renderRegisterForm,
  createUser,
  renderLoginForm,
  login,
  logout,
} from '../controllers/user.js';

import { storeReturnTo } from '../controllers/auth.js';

export const router = Router();

router.route('/register').get(renderRegisterForm).post(createUser);
router
  .route('/login')
  .get(renderLoginForm)
  .post(
    storeReturnTo,
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/campgrounds',
    }),
    login
  );

router.route('/logout').get(logout);
