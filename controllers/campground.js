import { campgroundSchema } from '../JoiSchemas.js';
import { Campground } from '../models/campground.js';
import { catchAsync } from '../utils/catchAsync.js';

// Joi validation
export const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const message = error.details.map((element) => element.message).join(', ');
    throw new AppError(message, 400);
  }
  next();
};

// campground root
export const showAllCampgrounds = catchAsync(async (req, res) => {
  const campgrounds = await Campground.find({});

  res.status(200).render('campgrounds/index', { campgrounds });
});

export const createCampground = catchAsync(async (req, res) => {
  const campground = new Campground(req.body.campground);
  await campground.save();
  req.flash('success', 'Campground created successfully');
  res.redirect(`campgrounds/${campground._id}`);
});

// campground/:id
export const showCampground = catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id).populate(
    'reviews'
  );
  res.status(200).render('campgrounds/show', { campground });
});

export const updateCampground = catchAsync(async (req, res) => {
  const campground = await Campground.findByIdAndUpdate(req.params.id, {
    ...req.body.campground,
  });
  req.flash('success', 'Campground updated successfully');
  res.redirect(`/campgrounds/${campground._id}`);
});

export const deleteCampground = catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndDelete(id);
  req.flash('success', 'Campground deleted successfully');
  res.redirect('/campgrounds');
});

// rendering

export const renderNewCampgroundForm = (req, res) => {
  res.render('campgrounds/new');
};

export const renderUpdateCampgroundForm = catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render('campgrounds/edit', { campground });
});
