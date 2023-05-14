// ### [ Imports ]

// packages
import express from 'express';
import methodOverride from 'method-override';
import morgan from 'morgan';
import ejsMate from 'ejs-mate';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import localStrategy from 'passport-local';

// node modules
import path from 'path';
import { fileURLToPath } from 'url';

// custom modules
import { User } from './models/user.js';
import AppError from './utils/AppError.js';
import { router as campgroundsRouter } from './routes/campground.js';
import { router as reviewsRouter } from './routes/review.js';

// ### [ Declarations ]

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sessionOptions = {
  secret: 'veryverysecretstuffyoudontknowabout',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

// ### [ Create App ]

export const app = express();

// ### [ Express Middleware ]

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ### [ Package Middleware ]

app.use(session(sessionOptions));
app.use(passport.initialize()); // NOTES
app.use(passport.session()); // NOTES must come before express session
passport.use(new localStrategy(User.authenticate)); // NOTES tell passport to use the local strategy, and the authentication method is on the user model (added by passport-local-mongoose)
passport.serializeUser(User.serializeUser()); // NOTES tell passport how to serialise a user. Serialising is how we store user data in the session
passport.deserializeUser(User.deserializeUser()); // NOTES tell passport how to deserialise a user.
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(flash());

// ### [ Custom Middleware ]

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// ### [ Routes ]

app.get('/', (req, res) => res.render('home.ejs'));
app.use('/campgrounds', campgroundsRouter);
app.use('/campgrounds/:id/reviews', reviewsRouter);

app.all('*', (req, res, next) => {
  next(new AppError('Page not found', 404));
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong', stack } = err;
  res.status(status).render('error', { status, message, stack });
});
