import mongoose, {Schema, model} from 'mongoose';

const campgroundSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  location: String,
  image: String,
});

export const Campground = model('Campground', campgroundSchema);
