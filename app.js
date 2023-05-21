// ### [ Imports ]

// packages
import * as dotenv from 'dotenv';
import * as exeDotEnv from './executeDotEnv.js';

import express from 'express';
import methodOverride from 'method-override';
// import morgan from 'morgan';
import ejsMate from 'ejs-mate';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import localStrategy from 'passport-local';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import helmet from 'helmet';
import MongoStore from 'connect-mongo';
// import multer from 'multer';

// node modules
import path from 'path';
import { fileURLToPath } from 'url';

// custom modules
import { User } from './models/user.js';
import AppError from './utils/AppError.js';
import { router as campgroundsRouter } from './routes/campground.js';
import { router as reviewsRouter } from './routes/review.js';
import { router as usersRouter } from './routes/user.js';
import { connect } from 'http2';

// ### [ Declarations ]

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_HOST
    : 'mongodb://localhost:27017/yelp-camp';

const storeSecret = process.env.STORE_SECRET || 'veryverysecretstuffhereapple';
const store = MongoStore.create({
  mongoUrl: dbUrl,
  touchAfter: 24 * 60 * 60, // seconds
  crypto: {
    secret: storeSecret,
  },
});
store.on('error', function (e) {
  console.log('Session store error');
});
const sessionOptions = {
  store,
  name: 'cgsid',
  secret: storeSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};
const scriptSrcUrls = [
  'https://stackpath.bootstrapcdn.com/',
  'https://api.tiles.mapbox.com/',
  'https://api.mapbox.com/',
  'https://kit.fontawesome.com/',
  'https://cdnjs.cloudflare.com/',
  'https://cdn.jsdelivr.net',
];
const styleSrcUrls = [
  'https://kit-free.fontawesome.com/',
  'https://stackpath.bootstrapcdn.com/',
  'https://api.mapbox.com/',
  'https://api.tiles.mapbox.com/',
  'https://fonts.googleapis.com/',
  'https://use.fontawesome.com/',
  'https://cdn.jsdelivr.net',
];
const connectSrcUrls = [
  'https://api.mapbox.com/',
  'https://a.tiles.mapbox.com/',
  'https://b.tiles.mapbox.com/',
  'https://events.mapbox.com/',
];
const fontSrcUrls = [];

// const upload = multer({ dest: 'uploads/' });

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

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(ExpressMongoSanitize());
app.use(xss());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: [],
        connectSrc: ["'self'", ...connectSrcUrls],
        scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
        'style-src': ["'self'", "'unsafe-inline'", ...styleSrcUrls],
        workerSrc: ["'self'", 'blob:'],
        objectSrc: [],
        imgSrc: [
          "'self'",
          'blob:',
          'data:',
          'https://res.cloudinary.com/dgfnzfd9q/',
          'https://images.unsplash.com',
        ],
        fontSrc: ["'self'", ...fontSrcUrls],
      },
    },
  })
);
app.use(session(sessionOptions));
app.use(methodOverride('_method'));
// app.use(morgan('dev'));
app.use(flash());

// ### [ Custom Middleware ]

app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.user = req.user;
  next();
});

// ### [ Routes ]

app.get('/', (req, res) => res.render('home.ejs'));
app.use('/campgrounds', campgroundsRouter);
app.use('/campgrounds/:id/reviews', reviewsRouter);
app.use('/', usersRouter);

app.all('*', (req, res, next) => {
  next(new AppError('Page not found', 404));
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong', stack } = err;
  res.status(status).render('error', { status, message, stack });
});
