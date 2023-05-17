import { campgroundSchema } from '../JoiSchemas.js';
import { Campground } from '../models/campground.js';
import { catchAsync } from '../utils/catchAsync.js';
import { cloudinary } from '../cloudinary/cloudinary.js';

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
  campground.images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  campground.author = req.user._id;
  await campground.save();
  req.flash('success', 'Campground created successfully');
  res.redirect(`campgrounds/${campground._id}`);
});

// campground/:id
export const showCampground = catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id)
    .populate({ path: 'reviews', populate: { path: 'author' } })
    .populate('author');
  if (!campground) {
    req.flash(
      'error',
      'This campground does not exist. It may have been deleted'
    );
    return res.redirect('/campgrounds');
  }
  res.status(200).render('campgrounds/show', { campground });
});

export const updateCampground = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(req.body);

  // update campground name/location/price/description
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  if (!campground) {
    req.flash(
      'error',
      'This campground does not exist. It may have been deleted'
    );
    return res.redirect('/campgrounds');
  }

  // update campground images (new images)
  const images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  campground.images.push(...images);
  await campground.save();

  // update campground images (delete images)
  if (req.body.deleteImages) {
    // delete from cloudinary
    for (let filename of req.body.deleteImages) {
      await cloudinary.uploader.destroy(filename);
    }
    // pull images out of the images array, where the filename is in the  req.body.deleteImages array
    await campground.updateOne({
      $pull: { images: { filename: { $in: req.body.deleteImages } } },
    });
  }

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
