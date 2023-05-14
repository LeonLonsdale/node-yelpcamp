import { User } from '../models/user.js';
import { catchAsync } from '../utils/catchAsync.js';

export const createUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const newUser = new User({ email, username });
    const user = await User.register(newUser, password);
    req.flash('success', 'Welcome to Yelpcamp');
    res.redirect('/campgrounds');
  } catch (err) {
    req.flash('error', err.message);
    res.redirect(req.url);
  }
};

export const login = (req, res) => {
  req.flash('success', 'Welcome back');
  res.redirect('/campgrounds');
};

export const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash('success', `You've logged out! Come back soon.`);
    res.redirect('/campgrounds');
  });
};

// render pages
export const renderRegisterForm = (req, res) => {
  res.render('users/register');
};
export const renderLoginForm = (req, res) => {
  res.render('users/login');
};
