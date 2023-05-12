// ### [ Imports ]

// packages
import express from 'express';
import methodOverride from 'method-override';
import morgan from 'morgan';
import ejsMate from 'ejs-mate';

// node modules
import path from 'path';
import { fileURLToPath } from 'url';

// custom modules
import AppError from './utils/AppError.js';
import { router as campgroundsRouter } from './routes/campground.js';

// ### [ Declarations ]

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ### [ Create App ]

export const app = express();

// ### [ Express Middleware ]

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ### [ Package Middleware ]

app.use(methodOverride('_method'));
app.use(morgan('dev'));

// ### [ Routes ]

app.get('/', (req, res) => res.render('home.ejs'));
app.use('/campgrounds', campgroundsRouter);

app.all('*', (req, res, next) => {
  next(new AppError('Page not found', 404));
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong', stack } = err;
  res.status(status).render('error', { status, message, stack });
});
