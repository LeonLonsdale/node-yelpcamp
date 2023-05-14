export const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    console.log('Session: ', req.session);
    console.log('Original URL :', req.originalUrl);
    req.flash('error', 'You are not logged in');
    return res.redirect('/login');
  }
  next();
};

export const storeReturnTo = (req, res, next) => {
  if (req.session.returnTo) res.locals.returnTo = req.session.returnTo;
  console.log('Store ReturnTo: ', req.session.returnTo);
  console.log('Locals: ', res.locals);
  next();
};
