import mongoose, {Schema, model} from 'mongoose';

const campgroundSchema = new Schema({
  title: String,
  price: String,
  description: String,
  location: String,
});

export const Campground = model('Campground', campgroundSchema);
