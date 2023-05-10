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
import { Campground } from './models/campground.js';
import { catchAsync } from './utils/catchAsync.js';

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

app.get('/campgrounds', async (req, res) => {
  const campgrounds = await Campground.find({});

  res.status(200).render('campgrounds/index', { campgrounds });
});

app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new');
});

app.post(
  '/campgrounds',
  catchAsync(async (req, res) => {
    const campground = new Campground(req.body.campground);
    await campground.save();
    res.redirect(`campgrounds/${campground._id}`);
  })
);

app.get(
  '/campgrounds/:id',
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.status(200).render('campgrounds/show', { campground });
  })
);

app.get(
  '/campgrounds/:id/edit',
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    res.render('campgrounds/edit', { campground });
  })
);

app.put(
  '/campgrounds/:id',
  catchAsync(async (req, res) => {
    const campground = await Campground.findByIdAndUpdate(req.params.id, {
      ...req.body.campground,
    });
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

app.delete(
  '/campgrounds/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndDelete(id);
    res.redirect('/campgrounds');
  })
);

app.use((err, req, res, next) => {
  res.send('Error yo! What you doing son?');
});
